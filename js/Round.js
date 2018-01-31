class Round {
	constructor() {
		var boardIds = Round.genRandomBoardIds();
		var boardsRotation = Array.from({length: boardIds.length}, () => Math.floor(Math.random() * 4));
		//var boardsRotation = Array.from({length: boardIds.length: 6}, () => 1);
		//
//		 
		
		this.boards = Array(Game.nBoardLines).fill(0).map(x => Array(Game.nBoardColumns).fill(null));

		for(var l = 0; l < Game.nBoardLines; l++){
			for(var c = 0; c < Game.nBoardColumns; c++){	  
				var currBoard = Board.generateBoard(boardIds.pop());
				currBoard.awardSpy = Spy.popFromStack();
				currBoard.rotate(boardsRotation.pop());
				this.boards[l][c] = currBoard 
			}
		  }	
		  
		//
		this.generateGrid();
		
	}  

	displayTableBoard() {
		console.log("displayTableBoard");
		var tableBoardElem = document.getElementById("tableBoard");
		for(var i = 0; i< this.boards.length; i++){
			tableBoardElem.appendChild(this.boards[i].displayBoard(tableBoardElem, i));			
		}
	}

	static genRandomBoardIds(){
		var boardIds = Array.from(new Array(10),(val,index)=>index);
		//shuffle(boardIds);		
		return boardIds.slice(0,Game.nBoardColumns*2);
		/*var k = boardIds.slice(0,5);
		k.unshift(boardIds[7]);
		return k;*/
	}

	/**
	 * Transforms a Round Tableboard into a 6x4  
	 */
	generateGrid(){
		this.tableBoardGrid = Array.from({length: Game.nBoardLines*2}, () => Array.from({length: Game.nBoardColumns*2}, () => null));
		this.spacesMap = new Map();

		for(var l = 0; l < Game.nBoardLines; l++){ 	
			for(var c = 0; c < Game.nBoardColumns; c++){	 
				for(var s = 0; s < this.boards[l][c].spaces.length; s++){		
					var nL = l*2+(s<2 ? 0:1);
					var nC = c*2+( s==0 || s==3 ? 0:1);
					var currSpace= this.boards[l][c].spaces[s];
					this.tableBoardGrid[nL][nC] = currSpace;					
					this.spacesMap.set(currSpace.id, currSpace);
				}				
			}
	  	}		
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