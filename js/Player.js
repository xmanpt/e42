class Player {
	constructor(name, color) {    
		this.name = name;
		this.color = color;

		this.availableSpyList = Spy.getPlayerInitialSpyList();
		this.discardedSpyList = [];

		this.id = guid();
		this.reset();
	}	
  
  reset(){
	  this.isProtected = false;
  }
	 
	hasCubes(){
		return this.nCubes>0;
	}
	
	setCubes(nCubes){
		console.log(this.name + " received "+ nCubes+ " cubes");
		this.nCubes = nCubes;		
	}
	addToHand(spy){
		console.log(this.name + " received "+ spy.name);
		this.availableSpyList.set(spy.id, spy);
	}

	addToDiscardList(spy){
		console.log(this.name + " discarded "+ spy.name);
		this.discardedSpyList.push(spy);
	}

	removeAvailableSpy(spyId){
		return this.availableSpyList.delete(spyId);
	}
 
}