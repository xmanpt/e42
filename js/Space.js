class Space {
  constructor(isHidden, spaceVisilibility) {
	  this.isHidden = isHidden;
	  this.spaceVisilibility = spaceVisilibility;
	  
	  this.id = "Space"+guid();
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

	
}