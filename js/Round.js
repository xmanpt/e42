class Round {
	constructor() {
		var boardIds = Round.genRandomBoardIds();
		//var boardsRotation = Array.from({length: boardIds.length}, () => Math.floor(Math.random() * 4));
		var boardsRotation = Array.from({length: boardIds.length}, () => 0);
		//
//		 
		
		this.boards = Array(Game.nBoardLines).fill(0).map(x => Array(Game.nBoardColumns).fill(null));

		for(var l = 0; l < this.boards.length; l++){
			for(var c = 0; c < this.boards[l].length; c++){	  
				var currBoard = Board.generateBoard(boardIds.shift());
				currBoard.awardSpy = Spy.popFromStack();
				currBoard.rotate(boardsRotation.pop());
				this.boards[l][c] = currBoard 
			}
		  }	
		  
		//
		this.generateGrid();
	}  

	

	static genRandomBoardIds(){
		var boardIds = Array.from(new Array(10),(val,index)=>index);
		//shuffle(boardIds);		
		return boardIds.slice(1,1+Game.nBoardColumns*2);
		/*var k = boardIds.slice(0,5);
		k.unshift(boardIds[7]);
		return k;*/
	}

	/**
	 * Transforms a Round Tableboard into a 6x4  
	 */
	generateGrid(){
		this.tableBoardGrid = Array.from({length: Game.nBoardLines*2}, () => Array.from({length: Game.nBoardColumns*2}, () => null));
		this.boardSpacesMap = new Map();

		for(var l = 0; l < Game.nBoardLines; l++){ 	
			for(var c = 0; c < Game.nBoardColumns; c++){	 
				for(var s = 0; s < this.boards[l][c].boardSpaces.length; s++){		
					var nL = l*2+(s<2 ? 0:1);
					var nC = c*2+( s==0 || s==3 ? 0:1);
					var currSpace= this.boards[l][c].boardSpaces[s];
					this.tableBoardGrid[nL][nC] = currSpace;					
					this.boardSpacesMap.set(currSpace.id, currSpace);
				}				
			}
	  	}		
	}

	returnTableBoardSpiesToOwners(){
		var allBoardSpaces = [].concat(...this.tableBoardGrid);

		for(var i = 0; i < allBoardSpaces.length; i++){ 
			if(allBoardSpaces[i].space.spyOwner!= null){
				allBoardSpaces[i].space.spyOwner.addToHand(allBoardSpaces[i].space.spy);
				Display.moveSpyFromTableBoardToPlayer(allBoardSpaces[i], allBoardSpaces[i].space.spyOwner, allBoardSpaces[i].space.spy);
			}
			
		}
	}			  
	
	
	activateNextSpyAbilities(){
		if(this.roundSolver == null){			
			this.roundSolver = new RoundSolver(this);
		}
		this.roundSolver.activateNextSpyAbilities();		
	}

	activateSpyAbility(ability){
		Display.resetTargetableSpaces();
		this.roundSolver.activateSpyAbility(ability);
	}
	
	

}

Round.prototype.toString = function()
{
	var str = "";
	str += "Boards: \t\t" + this.boards.map( elem => elem.name).join();
	str += "\n";
	str += "Board's Rotation: \t\t" + this.boardsRotation.join();
	str += "\n";
	str += "Spy Awards: \t" +this.boardsSpyAwards.map( elem => elem.name).join();
    return str;
}