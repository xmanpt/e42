class Round {
	constructor() {
		var boardIds = Round.genRandomBoardIds();
		var boardsRotation = Array.from({length: 6}, () => Math.floor(Math.random() * 4));
		//var boardsRotation = Array.from({length: 6}, () => 1);
		
		//
		this.boards = [];
		for(var i = 0; i < boardIds.length; i++){
			var currBoard = Board.generateBoard(boardIds[i]);	
			currBoard.awardSpy = Spy.popFromStack();
			currBoard.rotate(boardsRotation[i]);
			this.boards.push(currBoard);
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
		var boardIds = Array.from(new Array(8),(val,index)=>index+1);
		//shuffle(boardIds);		
		return boardIds.slice(0,6);
		/*var k = boardIds.slice(0,5);
		k.unshift(boardIds[7]);
		return k;*/
	}

	/**
	 * Transforms a Round Tableboard into a 6x4 
	 */
	generateGrid(){
		this.tableBoardGrid = Array.from({length: 4}, () => Array.from({length: 6}, () => null));
		this.spacesMap = new Map();

		for(var boardSeqId = 0; boardSeqId<this.boards.length; boardSeqId++){
			var currBoard = this.boards[boardSeqId]

			for(var spaceSeqId = 0; spaceSeqId<currBoard.spaces.length; spaceSeqId++){				
				var currSpace = currBoard.spaces[spaceSeqId];				
				var x = (boardSeqId%3)*2 + ( spaceSeqId == 0 || spaceSeqId ==3 ? 0 : 1);
				var y = Math.floor(boardSeqId/3)*2 +(spaceSeqId>1? 1:0);
				this.tableBoardGrid[y][x] = currSpace;
				this.spacesMap.set(currSpace.id, currSpace);
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