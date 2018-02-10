class RoundSolver {
	constructor(round) {	
		if(this.boardsSeq==null){
			this.boardsSeq = [].concat(...round.boards).sort(function(a,b) {return (a.solvSeqNr > b.solvSeqNr) ? 1 : 0;} );
			this.currBoardSeq = 0;
		}
		this.disabledSpy = new Map();
	}  

	activateNextSpyAbilities(){
		var currSpy = this.getNextSpy();

		if(currSpy==null){
			console.log("no more boards to process! ending round");	
			this.endRound();
			return;		
		}

		console.log("We found "+ currSpy.name+"!");		
		this.currSpyAvailableAbilities = currSpy.abilities.filter((n) => n.isActivable ).slice(0);
		
		if(this.currSpyAvailableAbilities.length==0){
			console.log("But unfortunelly has no activable skills...CHECK PLS!");								
			this.endSpyAction();
		}
		else{
			Display.drawSpyAbilities(currSpy, this.currSpyAvailableAbilities);					
		}
	}

	endRound(){
		Game.currentRound.returnTableBoardSpiesToOwners();
		Game.discardSpyPhase();
		if(Game.round<4){
			Display.clearActions();
			Game.initializeRound();
		}else{
			console.log("Game ended! Checking scores...");
			Game.checkScores();
		}
	}
	
	getNextSpy(){		
		if(this.currBoard==null) return null;
		if(this.currBoardSpySeq==null){
			this.currBoardSpySeq = this.currBoard.solvingSequence.filter((n) => this.currBoard.boardSpaces[n].space.spy != null ).map(elem => this.currBoard.boardSpaces[elem].space.spy );				
		}
		console.log("Checking " + this.currBoard.solvSeqNr +"th board, "+ this.currBoard.name + " for spies.. sneaky!");
		return this.currBoardSpySeq.shift();			
	}


	activateSpyAbility(spyAbilityCode){
		console.log("activateSpyAbility -> "+ spyAbilityCode);
		
		if(spyAbilityCode!=null){
			var spyAbility = SpyAbilityUtils.getSpyAbilityByCode(spyAbilityCode);
			
			if(spyAbility.targetsSpy){
				SpyAbilityUtils.activateTarget(spyAbility);
			}
		}
		this.endSpyAction();
	}


	endSpyAction(){		
		if(this.currBoardSpySeq.length == 0){			
			this.solveWinner();			
			this.currBoardSeq++;
			this.currBoardSpySeq=null;
		}	
		this.activateNextSpyAbilities();
	}

	get currBoard() {
		return this.boardsSeq[this.currBoardSeq];
	}
	get currBoardCoords(){
		var boards = Game.currentRound.boards;
		for(var l = 0; l < boards.length; l++){
			for(var c = 0; c < boards[l].length; c++){	  
				if(boards[l][c] == this.currBoard){
					return [l, c];
				}
			}
		  }	
		  return null;
	}

	getCurrBoardTargetableBoardSpaces(){
		return this.currBoard.boardSpaces.filter((n) => n.space.spyOwner!=null );
	}

	getCurrBoardAdjacentTargetableBoardSpaces(){
		var boards = Game.currentRound.boards;
		var currBoard = this.currBoard;
		var currBoardCoords = this.currBoardCoords;
		var l = currBoardCoords[0];
		var c = currBoardCoords[1];

		var adjacentBoards = [currBoard];
		
		if(c>0) adjacentBoards.push(boards[l][c-1]);
		if(c<3) adjacentBoards.push(boards[l][c+1]);
		if(l>0) adjacentBoards.push(boards[l-1][c]);
		if(l<1) adjacentBoards.push(boards[l+1][c]);
	
		return adjacentBoards.reduce(function(map, obj) {
			var boardTargetableSpies = obj.boardSpaces.filter((n) => n.space.spyOwner!=null )
			return map.concat(boardTargetableSpies);
		}, []);

	}


	


	solveWinner(){
		var playerBoardStrenght = [];
		var addStrenght = function(spy, owner, playerBoardStrenght){
			if(playerBoardStrenght[owner.id]==null){
				playerBoardStrenght[owner.id] = 0;
			}
			playerBoardStrenght[owner.id]+=spy.strenght;				
		}

		var spySpaces = this.currBoard.boardSpaces.filter((n) => n.space.spyOwner != null );

		for(var j = 0; j < spySpaces.length ; j++){			
			addStrenght(spySpaces[j].space.spy, spySpaces[j].space.spyOwner, playerBoardStrenght);				
			console.log(spySpaces[j].space.spy.name + "["+spySpaces[j].space.spy.strenght+"] > "+ Game.playerListById.get(spySpaces[j].space.spyOwner.id).name);
		}

		if(Object.keys(playerBoardStrenght).length==0){
			console.log("No one challanged this one!");				
		}
		else{
			var winnerId = Object.keys(playerBoardStrenght).sort(function(a,b){return playerBoardStrenght[b]-playerBoardStrenght[a]})[0];
			var winner = Game.playerListById.get(winnerId);	
						
			console.log("AND THE WINNER IS... "+winner.name);			
			winner.addToHand(this.currBoard.awardSpy);


			//
			var spaceElem = document.getElementById(this.currBoard.boardSpaces[this.currBoard.awardSpacePosition].id);
			spaceElem.innerHTML= ""
			spaceElem.style.background = ""

			var playerElem = document.getElementById(winner.id);				
			var currPlayerCardElem = Display.getPlayerCardElement(winner, this.currBoard.awardSpy);			
			currPlayerCardElem.style.backgroundColor = winner.color;		
			playerElem.appendChild(currPlayerCardElem);
		}

	}

}
