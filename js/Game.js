class Game {		
	
	static registerPlayers(n) {
		Log.info("Waiting for "+n+" players...");
		
		Game.playerInitialCubes = 8-n;
		Game.nBoardColumns = n>4 ? 4:3;
		Game.nBoardLines = 2;
		
		for(var i = 1; i< n+1; i++){
			var currPlayer = new Player("Player "+ i, Game.colors[i]);
			Game.playerList.push(currPlayer);
			
			var currPlayerDiv = document.createElement("div");
			currPlayerDiv.id = currPlayer.id;
			currPlayerDiv.classList.add("playerGround");
			currPlayerDiv.style.backgroundColor = currPlayer.colors;

			var currPlayerTitleDiv = document.createElement("div");
			currPlayerTitleDiv.classList.add("playerTitle");
			var t = document.createTextNode(currPlayer.name);   			
			currPlayerTitleDiv.appendChild(t);
			currPlayerDiv.appendChild(currPlayerTitleDiv);

			MAIN.e["players"].appendChild(currPlayerDiv);

			Log.info(currPlayer.name + " joined match");
						
			Game.currentPlayerTurn = Math.floor(Math.random() * Game.playerList.length);			
		}	

		Game.playerListById = Game.playerList.reduce(function(map, obj) {
			map.set(obj.id, obj);
			return map;
		}, new Map());

		for(var i = 0; i<Game.playerList.length; i++){
			Game.displayPlayerCards(Game.playerList[i]);
		}		

		Log.info("Ready for play!");			
	}

	static initializeRound() {
		Game.round++;
		Log.info("Initializing round "+Game.round+"...")

		console.log("Giving cubes to players...");
		for(var i = 0; i<Game.playerList.length; i++){
			Game.playerList[i].setCubes(Game.playerInitialCubes);
		}		
		Game.currentRound = new Round();
		console.log(Game.currentRound);			
		Game.currentRound.displayTableBoard();		
		Game.setupNextPlay();
	}

	static displayPlayerCards(player){	
		var playerElem = document.getElementById(player.id);
		player.availableSpyList.forEach(function (spy) {  
			var currPlayerCardElem = Game.getPlayerCardElement(player, spy);			
			currPlayerCardElem.style.backgroundColor = player.color;		
			playerElem.appendChild(currPlayerCardElem);
		}); 
	}

	static setupNextPlay() {
		var currTurnPlayer = Game.playerList[Game.currentPlayerTurn];			
		var playerElem = document.getElementById(currTurnPlayer.id);
		playerElem.classList.toggle("playersTurn");

		Game.highlightTurnPlayableSpies(currTurnPlayer, playerElem);
		Game.highlightTurnPlayableSpaces(currTurnPlayer);
		

		Game.currTurnSpyMove = null;
		Game.currTurnSpaceMove = null;
				
		Log.info("It's "+ currTurnPlayer.name+ " turn!");		 
	}

	static highlightTurnPlayableSpies(currTurnPlayer, playerElem){
		for(var i = 1; i < playerElem.childNodes.length; i++ ){			
			playerElem.childNodes[i].classList.toggle("playableSpy");
			
			playerElem.childNodes[i].onclick = (
				function(spyId) {
					return function() {
						Game.receiveTurnSpyMove(spyId);									
					};
				}
			)(playerElem.childNodes[i].id);			
		}
	}


	static highlightTurnPlayableSpaces(currTurnPlayer){
		var available = [];
		var visited = Array.from({length: 4}, () => Array.from({length: 6}, () => false));
		
		var checkSpace = function(j, i, available, visited) {
			if(visited[j][i]) return false;
			visited[j][i] = true;	
			var currSpace = Game.currentRound.tableBoardGrid[j][i];
			var isAvailable = currSpace.spy==null;
			if (isAvailable){
				available.push(currSpace);
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
				if(j==0 || j == 3 || i ==0 || i == 5){
					addedSpace = checkSpace(j, i, available, visited);
				}

				if(!addedSpace && Game.currentRound.tableBoardGrid[j][i].spyOwner == currTurnPlayer){
					checkAdjacentSpaces(j, i, available, visited);
				}
			}
		}		

		for(var i = 0; i< available.length; i ++){
			var currSpaceElem = document.getElementById(available[i].id);
			currSpaceElem.classList.toggle("playableSpace");
			currSpaceElem.onclick = (
				function(spaceId) {
					return function() {
						Game.receiveTurnSpaceMove(spaceId);									
					};
				}
			)(available[i].id);	
		}

		Game.availableTurnPlayableSpaces = available;
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
				
		var currTurnPlayer = Game.playerList[Game.currentPlayerTurn];	
		
		var spyElem = document.getElementById(spyId);
		if(spyElem==null || spyElem.parentElement==null)
			console.log("somethings missing : "+ spyId)
		spyElem.parentElement.removeChild(spyElem);

		var playerElem = document.getElementById(currTurnPlayer.id);
		playerElem.classList.toggle("playersTurn");

		for(var i = 1; i < playerElem.childNodes.length; i++ ){			
			playerElem.childNodes[i].classList.toggle("playableSpy");
		}

		Game.checkPlay();	
	}

	static checkPlay(){
		if(Game.currTurnSpaceMove==null || Game.currTurnSpyMove==null)
			return;
		
		console.log("Play detected!")
		var player = Game.playerList[Game.currentPlayerTurn];
		var spy = player.availableSpyList.get(Game.currTurnSpyMove);
		var space = Game.currentRound.spacesMap.get(Game.currTurnSpaceMove)
		space.spy = spy;
		space.spyOwner = player;
		player.removeAvailableSpy(Game.currTurnSpyMove);
		
		document.getElementById(Game.currTurnSpaceMove).style.backgroundColor =  player.color;
		document.getElementById(Game.currTurnSpaceMove).innerHTML += spy.name + "["+spy.strenght+"]";

		player.nCubes--;
		Game.currentPlayerTurn = (Game.currentPlayerTurn+1)%Game.playerList.length;
		
		if(Game.playerList[Game.currentPlayerTurn].hasCubes()){
			Game.setupNextPlay();
		} else { 
			Log.info("Round's over"); 
			var btn = addActionBtn("Finish round!");
			btn.onclick = (
				function(i) {
					return function() {						
						clearActions();
						Game.finishRound();
					};
				}
			)(i);
		}
	}
	

	static getPlayerCardElement(player, spy){
		var spyParagraph = document.createElement("P");
		spyParagraph.id = spy.id;
		spyParagraph.classList.add("spyInHand");
		
		spyParagraph.appendChild(document.createTextNode(spy.name));
		spyParagraph.appendChild(document.createElement("BR"));
		spyParagraph.appendChild(document.createTextNode("strenght: " +spy.strenght));
		
		
		return spyParagraph
	}

	static finishRound(){
		Log.info("Finishing round, let's see those boards!")
		
		var boardsSolveSequence = Game.currentRound.boards.slice(0).sort(function(a,b) {return (a.solvSeqNr > b.solvSeqNr) ? 1 : 0;} ); 
		
		for(var i = 0; i < boardsSolveSequence.length ; i++){
			var currBoard = boardsSolveSequence[i];
			Log.info("Solving " + currBoard.solvSeqNr +"th board, "+ currBoard.name);
			console.log("Solving " + currBoard.solvSeqNr +"th board, "+ currBoard.name);
			var spaceSolvingSequence = currBoard.solvingSequence.map(elem => currBoard.spaces[elem] );
			
			var playerBoardStrenght = [];
			var addStrenght = function(spy, owner, playerBoardStrenght){
				if(playerBoardStrenght[owner.id]==null){
					playerBoardStrenght[owner.id] = 0;
				}
				playerBoardStrenght[owner.id]+=spy.strenght;				
			}

			for(var j = 0; j < spaceSolvingSequence.length ; j++){
				if(spaceSolvingSequence[j].spyOwner==null){
					continue;
				}
				addStrenght(spaceSolvingSequence[j].spy, spaceSolvingSequence[j].spyOwner, playerBoardStrenght);				
				console.log(spaceSolvingSequence[j].spy.name + "["+spaceSolvingSequence[j].spy.strenght+"] > "+ Game.playerListById.get(spaceSolvingSequence[j].spyOwner.id).name);
			}

			if(Object.keys(playerBoardStrenght).length==0){
				console.log("No one challanged this one!");				
			}
			else{
				var winnerId = Object.keys(playerBoardStrenght).sort(function(a,b){return playerBoardStrenght[b]-playerBoardStrenght[a]})[0];
				var winner = Game.playerListById.get(winnerId);	
							
				console.log("AND THE WINNER IS... "+winner.name);
				currBoard.spyAwad = null;
				winner.addToHand(currBoard.awardSpy);


				//
				var spaceElem = document.getElementById(currBoard.spaces[currBoard.awardSpacePosition].id);
				spaceElem.innerHTML= ""
				spaceElem.style.background = ""

				var playerElem = document.getElementById(winner.id);				
				var currPlayerCardElem = Game.getPlayerCardElement(winner, currBoard.awardSpy);			
				currPlayerCardElem.style.backgroundColor = winner.color;		
				playerElem.appendChild(currPlayerCardElem);
			}

		}
		

		
	}

	
	//GETTERS && SETTERS
	//	static get playerInitialCubes(){ return this._playerInitialCubes; }
	//	static set playerInitialCubes(value){ this._playerInitialCubes = value; }
}
