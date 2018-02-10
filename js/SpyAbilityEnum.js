const SpyAbilityEnum = Object.freeze({
    ASSASSIN:     { code: 0, name: "Assassin",     isActivable: true,  targetsSpy: true  },
    CHARM:  	  { code: 1, name: "Charm",        isActivable: true,  targetsSpy: true   },
    CONSPIRACY:   { code: 2, name: "Conspiracy",   isActivable: true,  targetsSpy: false   },
    DIPLOMACY:    { code: 3, name: "Diplomacy",    isActivable: true,  targetsSpy: true   },
    NATIONALISM:  { code: 4, name: "Nationalism",  isActivable: false, targetsSpy: false   },
    WOMAN:        { code: 5, name: "Woman",        isActivable: false, targetsSpy: false  },
    DA:           { code: 6, name: "Double Agent", isActivable: true,  targetsSpy: true   },
});
   
class SpyAbilityUtils {

	static getSpyAbilityByCode(spyAbilityCode) {    
    	var keys = Object.keys(SpyAbilityEnum);
    	for (let i=0; i<keys.length; i++) {
      		if(	SpyAbilityEnum[keys[i]].code == spyAbilityCode){
        		return SpyAbilityEnum[keys[i]];
      		}
    	}	
		return null;
  	}

	static activateTarget(spyAbility) {
    	switch (spyAbility) {
			case SpyAbilityEnum.ASSASSIN: 
				var targetableBoardSpaces =  Game.currentRound.roundSolver.getCurrBoardTargetableBoardSpaces();
				Display.highlightTargetableSpaces(targetableBoardSpaces);			
				break;
			case SpyAbilityEnum.CHARM: 
			case SpyAbilityEnum.DIPLOMACY: 
			case SpyAbilityEnum.DA: 
				var targetableBoardSpaces =  Game.currentRound.roundSolver.getCurrBoardAdjacentTargetableBoardSpaces();
				Display.highlightTargetableSpaces(targetableBoardSpaces);			
        		break;
      		default: 
				document.write("Unknown color");
		}
	}

}
