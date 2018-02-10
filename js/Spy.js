class Spy {
	constructor(name, nationality, strenght, winpoints, abilities) {    
	this.name = name;
	this.nationality = nationality;
	this.strenght = strenght; 
	this.winpoints = winpoints;
	this.abilities = abilities;
	
	this.id ="Spy"+guid();
	this.reset();
  }
  
  reset(){
	  this.isProtected = false;
	}
	
	static getPlayerInitialSpyList() {
		var initialSpyList = [];
		initialSpyList.push(new Spy("Hans R.", SpyNationalityEnum.DE, 1, 1, [SpyAbilityEnum.CONSPIRACY]));  
		initialSpyList.push(new Spy("Elizabeth", SpyNationalityEnum.GB, 1, 1, [SpyAbilityEnum.CHARM, SpyAbilityEnum.WOMAN]));  
		initialSpyList.push(new Spy("Linda X.", SpyNationalityEnum.US, 0, 1, [SpyAbilityEnum.ASSASSIN, SpyAbilityEnum.WOMAN]));  
		initialSpyList.push(new Spy("Araújo", SpyNationalityEnum.PT, 2, 1, []));  
		initialSpyList.push(new Spy("Guedes", SpyNationalityEnum.PT, 1, 1, [SpyAbilityEnum.DIPLOMACY]));  
		initialSpyList.push(new Spy("Roque", SpyNationalityEnum.PT, 0, 1, [SpyAbilityEnum.NATIONALISM]));  

		return initialSpyList.reduce(function(map, spy) {
			map.set(spy.id, spy);
			return map;
		}, new Map());
	}

	static popFromStack() {
		var spy = Spy.spyStack.shift();		
		return spy;
	}

	
   
}

