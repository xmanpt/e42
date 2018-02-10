class SpaceSpec {
  constructor(name) {
    this.id = guid();
	this.name = name;
  }
}

class Space {
  constructor(name) {
    this.id = guid();
	this.name = name;
	this.spaceSpec = new SpaceSpec(name);
  }
}


class Board {
  constructor(name) {
    this.id = guid();
	this.name = name;
	this.spaces = [];
	
	for(var i = 0; i<4; i++){
	  this.spaces.push(new Space(this.name+" "+i));
	}	
  }
	rotate(r){
		var spaceSpecs = this.spaces.reduce(function(map, obj) {
			map.push(obj.spaceSpec);
			return map;
		}, []);

		for(var i = 0; i< r; i++){
		  spaceSpecs.unshift(spaceSpecs.pop());
		}
		
		for(var i = 0; i< this.spaces.length; i++){
		  this.spaces[i].spaceSpec = spaceSpecs[i];
		}
		
		
		
	}
}



class TableBoard {
  constructor() {
	  this.lines = 2;
	  this.columns = 3;
	  
	  this.boards = Array(this.lines).fill(0).map(x => Array(this.columns).fill(null))	  
	  
	  for(var l = 0; l < this.lines; l++){
			for(var c = 0; c < this.columns; c++){	  
				this.boards[l][c] = new Board("["+l+", "+c+"]");
			}
	  }		 	  
	  
	  this.boardsMatrix = Array(this.lines*2).fill(0).map(x => Array(this.columns*2).fill(null))	  
	  for(var l = 0; l < this.lines; l++){ 	
			for(var c = 0; c < this.columns; c++){	 
				for(var s = 0; s < this.boards[l][c].spaces.length; s++){		
					var nL = l*2+(s<2 ? 0:1);
					var nC = c*2+( s==0 || s==3 ? 0:1);
					this.boardsMatrix[nL][nC] = this.boards[l][c].spaces[s];
				}
				
			}
	  }		 	
  }
  

}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


var tb = new TableBoard();