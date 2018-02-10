class Display {	
	
	static clearActions(){
		Display.e["actions"] .innerHTML = "";
	}
	
	static addActionBtn(text){
		var btn = document.createElement("BUTTON");      
		btn.classList.add("button", "buttonOption");
		
		var t = document.createTextNode(text);       
		btn.appendChild(t);
	
		Display.e["actions"].appendChild(btn);   
		return btn;
	}

	static drawPlayer(currPlayer){
		var currPlayerDiv = document.createElement("div");
		currPlayerDiv.id = currPlayer.id;
		currPlayerDiv.classList.add("playerGround");
		currPlayerDiv.style.backgroundColor = currPlayer.colors;

		var currPlayerTitleDiv = document.createElement("div");
		currPlayerTitleDiv.classList.add("playerTitle");
		var t = document.createTextNode(currPlayer.name);   			
		currPlayerTitleDiv.appendChild(t);
		currPlayerDiv.appendChild(currPlayerTitleDiv);

		Display.e["players"].appendChild(currPlayerDiv);
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

	static displayPlayerCards(player){	
		var playerElem = document.getElementById(player.id);
		player.availableSpyList.forEach(function (spy) {  
			var currPlayerCardElem = Display.getPlayerCardElement(player, spy);			
			currPlayerCardElem.style.backgroundColor = player.color;		
			playerElem.appendChild(currPlayerCardElem);
		}); 
	}

	static displayTableBoard() {
		//console.log("displayTableBoard");
		for(var l = 0; l < Game.currentRound.boards.length; l++){
			for(var c = 0; c < Game.currentRound.boards[l].length; c++){	  
				Display.e["tableBoard"].appendChild(Display.displayBoard(l, c));			
			}
		}
	}

	

	static highlightTurnPlayableSpies(currTurnPlayer){
		var playerElem = document.getElementById(currTurnPlayer.id);
		playerElem.classList.toggle("playersTurn");
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

	static highlightTurnPlayableSpaces(available){
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

	}

	static displayBoard(boardLine, boardColumn){
		//console.log("displayBoard")
		var board= Game.currentRound.boards[boardLine][boardColumn];
		var boardElem = document.createElement("Board_"+boardLine+"_"+boardColumn);      
		boardElem.classList.add("board");		
		for(var i = 0; i<board.boardSpaces.length; i++){
			var spaceElem = Display.displayBoardSpace(board.boardSpaces[i], boardElem, boardLine, boardColumn, i);
			var solveOrder = board.solvingSequence.indexOf(i);
			if(solveOrder>-1)
				spaceElem.innerHTML += solveOrder;
			if(i==board.awardSpacePosition){
				spaceElem.style.background = "#59363A";
			}

			boardElem.appendChild(spaceElem);		
		}
		return boardElem;
  }

  static addSpyInfoToSpace(parentElem, spy){

	var pElem = function(text){			
		var pElem = document.createElement("P");
		pElem.appendChild(document.createTextNode(text));
		return pElem;
	}

	parentElem.appendChild( pElem(spy == null ? "" : spy.name));
	parentElem.appendChild( pElem(spy == null ? ""  : "["+ spy.strenght+"]")); 	
  }

	static displayBoardSpace(boardSpace, boardElem, boardLine, boardColumn, i){
		//console.log("displayBoardSpace");

		var boardSpaceElem = document.createElement("space_"+boardLine+"_"+boardColumn+"_"+i);  
		boardSpaceElem.id = boardSpace.id;
		
		Display.addSpyInfoToSpace(boardSpaceElem, boardSpace.space.spy);

		if(boardSpace.space.spyOwner!=null){
			boardSpaceElem.style.backgroundColor = boardSpace.space.spyOwner.color;		
		}

		boardSpaceElem.classList.add("space");				
		return boardSpaceElem;
	}

	static removeSpyFromPlayer(player, spy){
		var spyElem = document.getElementById(spy.id);
		if(spyElem==null || spyElem.parentElement==null)
			console.log("somethings missing : "+ spyId)
		spyElem.parentElement.removeChild(spyElem);
	}

	static moveSpyFromPlayerToTableBoard(boardSpaceId, player, spy){
		Display.removeSpyFromPlayer(player, spy);

		var playerElem = document.getElementById(player.id);
		playerElem.classList.toggle("playersTurn");

		for(var i = 1; i < playerElem.childNodes.length; i++ ){			
			playerElem.childNodes[i].classList.toggle("playableSpy");
		}



		var boardSpaceElem = document.getElementById(boardSpaceId);
		boardSpaceElem.style.backgroundColor =  player.color;
		
		Display.addSpyInfoToSpace(boardSpaceElem, spy);
	}

	

	static moveSpyFromTableBoardToPlayer(boardSpace, player, spy){
		var spaceElem = document.getElementById(boardSpace.id);
		spaceElem.innerHTML= ""
		spaceElem.style.background = ""

		var playerElem = document.getElementById(player.id);				
		var currPlayerCardElem = Display.getPlayerCardElement(player, spy);			
		currPlayerCardElem.style.backgroundColor = player.color;		
		playerElem.appendChild(currPlayerCardElem);
	}

	static drawSpyAbilities(spy, abilities){
		Display.clearActions();
		var spyParagraph = document.createElement("P");		
		spyParagraph.style.color ="white";
		spyParagraph.appendChild(document.createTextNode(spy.name));
		Display.e["actions"].appendChild(spyParagraph);   
		
		abilities.map(currElement => {
			var btn = Display.addActionBtn(currElement.name);
			btn.onclick = function() {
				Game.currentRound.activateSpyAbility(currElement.code)
			};						
		});	

		var btn = Display.addActionBtn("Continue");
			btn.onclick = function() {
				Game.currentRound.activateSpyAbility()
			};
	}

	static resetTargetableSpaces(){
		Array.from(document.getElementsByClassName("targetableSpace")).forEach( (e) => {			
			e.classList.remove("targetableSpace");
		  });
	}			

	static highlightTargetableSpaces(targetable){
		for(var i = 0; i< targetable.length; i ++){
			var currSpaceElem = document.getElementById(targetable[i].id);
			currSpaceElem.classList.toggle("targetableSpace");
			currSpaceElem.onclick = (
				function(spaceId) {
					return function() {
						Game.receiveTurnSpaceMove(spaceId);									
					};
				}
			)(targetable[i].id);	
		}

	}
}


Display.e = [];
Display.e["actions"] = document.getElementById("actions");
Display.e["players"] = document.getElementById("players");
Display.e["tableBoard"] = document.getElementById("tableBoard");