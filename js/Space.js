class Space {
  constructor(isHidden, spaceVisilibility) {
	  this.isHidden = isHidden;
	  this.spaceVisilibility = spaceVisilibility;
	  
	  this.id = guid();
	  this.reset();
  }
  
  reset(){
	  this.spy = null;
	  this.spyOwner = null;
	}  
		
	setspy(spy, spyOwner){
		this.spy = spy;
		this.spyOwner = spyOwner;
	}

	displaySpace(boardElem, boardId, i){
		console.log("displaySpace");
		var spaceElem = document.createElement("Space_"+boardId+"_"+i);  
		spaceElem.id = this.id;
		spaceElem.innerHTML += this.spy == null ? "" : this.spy.name;
		spaceElem.innerHTML +=  this.isHidden ? "X":"O"; 
		spaceElem.innerHTML +=  this.spy == null ? ""  : "["+this.spy.strenght+"]"; 

		spaceElem.classList.add("space");				
		return spaceElem;
	}
}