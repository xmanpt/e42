class Game {		
	
	static getCurrentPlayer(){
		return Game.playerList[Game.currentPlayerTurn];			
	}

	static registerPlayers(n) {
		Game.playerInitialCubes = 8-n;
		Game.nBoardColumns = n>4 ? 4:3;
		Game.nBoardLines = 2;
		
		for(var i = 1; i< n+1; i++){
			var currPlayer = new Player("Player "+ i, Game.colors[i]);
			Game.playerList.push(currPlayer);			
			Display.drawPlayer(currPlayer);			
			Game.currentPlayerTurn = 0;//Math.floor(Math.random() * Game.playerList.length);			
		}	

		Game.playerListById = Game.playerList.reduce(function(map, obj) {
			map.set(obj.id, obj);
			return map;
		}, new Map());

		for(var i = 0; i<Game.playerList.length; i++){
			Display.displayPlayerCards(Game.playerList[i]);
		}					

		Game.missions = [];
		var missionEnumValues = Object.keys(MissionEnum).slice();
		shuffle(missionEnumValues);
		Game.missions = missionEnumValues.slice(0,4).reduce(function(map, obj) {
			console.log("Mission: "+ obj)
			map.push(MissionEnum[obj]);
			return map;
		}, []);

		 
	}

	static initializeRound() {
		Game.round++;				
		console.log("Round "+Game.round+". Giving cubes to players...");
		for(var i = 0; i<Game.playerList.length; i++){
			Game.playerList[i].setCubes(Game.playerInitialCubes);
		}		
		Game.currentRound = new Round();
		Display.e["tableBoard"].innerHTML = "";
		Display.displayTableBoard();		
		Game.setupNextPlay();
	}

	

	static setupNextPlay() {
		
		Game.availableTurnPlayableSpaces = Game.getPlayerAvailablesTableSpaces();

		Display.highlightTurnPlayableSpies(Game.getCurrentPlayer());
		Display.highlightTurnPlayableSpaces(Game.availableTurnPlayableSpaces);
		
		Game.currTurnSpyMove = null;
		Game.currTurnSpaceMove = null;
						
	}

	
	static getPlayerAvailablesTableSpaces(){
		var available = [];
		var visited = Array.from({length: Game.currentRound.tableBoardGrid.length}, () => Array.from({length: Game.currentRound.tableBoardGrid[0].length}, () => false));

		var checkSpace = function(j, i, available, visited) {
			if(visited[j][i]) return false;
			visited[j][i] = true;	
			var currBoardSpace = Game.currentRound.tableBoardGrid[j][i];
			var isAvailable = currBoardSpace.space.spy==null;
			if (isAvailable){				
				available.push(currBoardSpace);
			}
			
			return isAvailable;		 
		}
		
		var checkAdjacentSpaces = function(j, i, available, visited){			
			if(i>0) checkSpace(j, i-1, available, visited);
			if(i<4) checkSpace(j, i+1, available, visited);
			if(j>1) checkSpace(j-1, i, available, visited);
			if(j<3) checkSpace(j+1, i, available, visited);
		}

		for(var j = 0; j < Game.currentRound.tableBoardGrid.length; j++){
			for(var i = 0; i < Game.currentRound.tableBoardGrid[j].length; i++){
				var addedSpace = false;
				if(j==0 || j == 3 || i ==0 || i == 5 ||
					Game.currentRound.boards[Math.floor(j/2)][Math.floor(i/2)].boardAbility == BoardAbilityEnum.ALL_EXTERIOR){
					addedSpace = checkSpace(j, i, available, visited);
				}

				if(!addedSpace && Game.currentRound.tableBoardGrid[j][i].space.spyOwner == Game.getCurrentPlayer()){
					checkAdjacentSpaces(j, i, available, visited);
				}
			}
		}		

		return available;
	}

	

	static receiveTurnSpaceMove(spaceId){		
		console.log("Selected space "+ spaceId);
		Game.currTurnSpaceMove = spaceId;

		for(var i = 0; i< Game.availableTurnPlayableSpaces.length; i++){
			var currSpaceElem = document.getElementById(Game.availableTurnPlayableSpaces[i].id);			
			currSpaceElem.classList.toggle("playableSpace");
			currSpaceElem.onclick = null;			
		}

		Game.checkPlay();

		
	}


	static receiveTurnSpyMove(spyId){
		console.log("Selected spy "+ spyId);
		Game.currTurnSpyMove = spyId;								

		Game.checkPlay();	
	}

	static checkPlay(){
		if(Game.currTurnSpaceMove==null || Game.currTurnSpyMove==null)
			return;
		
		console.log("Play detected!")
		var player = Game.getCurrentPlayer();
		var spy = player.availableSpyList.get(Game.currTurnSpyMove);
		var tableSpace = Game.currentRound.boardSpacesMap.get(Game.currTurnSpaceMove)
		tableSpace.space.spy = spy;
		tableSpace.space.spyOwner = player;
		player.removeAvailableSpy(Game.currTurnSpyMove);
		
		Display.moveSpyFromPlayerToTableBoard(Game.currTurnSpaceMove, player, spy)
		

		player.nCubes--;
		Game.currentPlayerTurn = (Game.currentPlayerTurn+1)%Game.playerList.length;
		
		if(Game.getCurrentPlayer().hasCubes()){
			Game.setupNextPlay();
		} else { 			
			console.log("No more plays!");
			var btn = Display.addActionBtn("Finish round!");
			btn.onclick = (
				function(i) {
					return function() {						
						Display.clearActions();						
						Game.currentRound.activateNextSpyAbilities();
					};
				}
			)(i);
		}
	}
		

	


	static checkScores(){
	
		var playerBoardStrenght = Game.playerList.reduce(function(map, obj) {
			map[obj.id] = [];
			//discarded
			map[obj.id][0] = obj.discardedSpyList.length;
			//handSpiesStrenght
			map[obj.id][1] =
			Array.from(obj.availableSpyList.keys()).reduce(function (totStrength, key) {
					totStrength += obj.availableSpyList.get(key).winpoints;
					return totStrength;
				}, 0 );
				return map;
			}, []);

			


		

	}

	static discardSpyPhase(){
		
		Game.playerList.map(elem => {
			while(elem.availableSpyList.size>6){	
				var playerElem = document.getElementById(elem.id);
				var spyElem = playerElem.lastChild;		
				elem.discardFromHand(elem.availableSpyList.get(spyElem.id));	
				playerElem.removeChild(spyElem);
			}
		})
	}

	
	//GETTERS && SETTERS
	//	static get playerInitialCubes(){ return this._playerInitialCubes; }
	//	static set playerInitialCubes(value){ this._playerInitialCubes = value; }
}
