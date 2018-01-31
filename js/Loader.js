/**
 * SPY
 */
console.log("SpyStack setup init...");
Spy.spyStack = [];
Spy.spyStack.push(new Spy("Nora S.", SpyNationalityEnum.DE, 1, 3, [SpyAbilityEnum.ASSASSIN, SpyAbilityEnum.WOMAN])); 
Spy.spyStack.push(new Spy("A. Alekhine", SpyNationalityEnum.SU, 0, 2, [SpyAbilityEnum.ASSASSIN, SpyAbilityEnum.DIPLOMACY]));  
Spy.spyStack.push(new Spy("C. Rosa", SpyNationalityEnum.PT, 2, 2, [SpyAbilityEnum.ASSASSIN]));  
Spy.spyStack.push(new Spy("Otto M.", SpyNationalityEnum.DE, 2, 3, [SpyAbilityEnum.CONSPIRACY]));  
Spy.spyStack.push(new Spy("G. Green", SpyNationalityEnum.GB, 2, 3, [SpyAbilityEnum.NATIONALISM]));  
Spy.spyStack.push(new Spy("Hedy L.", SpyNationalityEnum.US, 3, 2, [SpyAbilityEnum.NATIONALISM, SpyAbilityEnum.WOMAN]));  
Spy.spyStack.push(new Spy("Garbo", SpyNationalityEnum.ES, 3, 4, []));  
Spy.spyStack.push(new Spy("A. Ferro", SpyNationalityEnum.PT, 1, 4, [SpyAbilityEnum.NATIONALISM]));  
Spy.spyStack.push(new Spy("Pires", SpyNationalityEnum.PT, 4, 1, [SpyAbilityEnum.CONSPIRACY]));  
Spy.spyStack.push(new Spy("Walser S.", SpyNationalityEnum.DE, 4, 1, [SpyAbilityEnum.NATIONALISM]));  
Spy.spyStack.push(new Spy("J. Bourbon", SpyNationalityEnum.ES, 2, 3, [SpyAbilityEnum.DIPLOMACY, SpyAbilityEnum.DIPLOMACY]));  
Spy.spyStack.push(new Spy("S. Smith", SpyNationalityEnum.US, 1, 3, [SpyAbilityEnum.ASSASSIN]));  
Spy.spyStack.push(new Spy("Amélia", SpyNationalityEnum.PT, 4, 1, [SpyAbilityEnum.CHARM, SpyAbilityEnum.WOMAN]));  
Spy.spyStack.push(new Spy("Dusko P.", SpyNationalityEnum.YU, 3, 1, [SpyAbilityEnum.CONSPIRACY, SpyAbilityEnum.CONSPIRACY]));  
Spy.spyStack.push(new Spy("I. Shouwaloff", SpyNationalityEnum.SU, 1, 1, [SpyAbilityEnum.ASSASSIN, SpyAbilityEnum.ASSASSIN]));  
Spy.spyStack.push(new Spy("Antoine S. E.", SpyNationalityEnum.FR, 2, 2, [SpyAbilityEnum.CHARM, SpyAbilityEnum.CONSPIRACY]));  
Spy.spyStack.push(new Spy("Zarah L.", SpyNationalityEnum.DE, 1, 4, [SpyAbilityEnum.CHARM, SpyAbilityEnum.WOMAN]));  
Spy.spyStack.push(new Spy("I. L. Fleming", SpyNationalityEnum.GB, 3, 2, [SpyAbilityEnum.CHARM]));  
Spy.spyStack.push(new Spy("Loreta B.", SpyNationalityEnum.GB, 1, 4, [SpyAbilityEnum.CONSPIRACY, SpyAbilityEnum.WOMAN]));  
Spy.spyStack.push(new Spy("E. Windsor", SpyNationalityEnum.GB, 4, 2, [SpyAbilityEnum.DIPLOMACY]));  
Spy.spyStack.push(new Spy("A. Monteiro", SpyNationalityEnum.PT, 3, 3, [SpyAbilityEnum.DIPLOMACY]));  
Spy.spyStack.push(new Spy("Salazar", SpyNationalityEnum.PT, 2, 1, [SpyAbilityEnum.NATIONALISM, SpyAbilityEnum.NATIONALISM]));  
Spy.spyStack.push(new Spy("G. René", SpyNationalityEnum.FR, 0, 2, [SpyAbilityEnum.ASSASSIN, SpyAbilityEnum.CONSPIRACY]));  
Spy.spyStack.push(new Spy("Anne D.", SpyNationalityEnum.US, 2, 3, [SpyAbilityEnum.CHARM, SpyAbilityEnum.WOMAN]));  
Spy.spyStack.push(new Spy("Clark G.", SpyNationalityEnum.US, 2, 4, [SpyAbilityEnum.DIPLOMACY]));  
Spy.spyStack.push(new Spy("Zsa Zsa G.", SpyNationalityEnum.HU, 1, 3, [SpyAbilityEnum.CHARM, SpyAbilityEnum.CHARM, SpyAbilityEnum.WOMAN]));  
Spy.spyStack.push(new Spy("C. Lucky Luciano", SpyNationalityEnum.IT, 5, 1, []));     
//shuffle(Spy.spyStack);
console.log("SpyStack setup ended. " + Spy.spyStack.length + " spies loaded.");



/**
 *  GAME
 */
console.log("Game setup init...");
Game.playerList = [];
Game.colors = ["","#FF5454", "#45D245", "#36A5A5", "#FFA154"];
Game.round = 0;

/**
 * GAME LOGIC
 */
Log.info("Welcome to game");

class MAIN {	}

MAIN.e = [];
MAIN.e["actions"] = document.getElementById("actions");
MAIN.e["players"] = document.getElementById("players");


function clearActions(){
	MAIN.e["actions"] .innerHTML = "";
}

function addActionBtn(text){
	var btn = document.createElement("BUTTON");      
	btn.classList.add("button", "buttonOption");
	
	var t = document.createTextNode(text);       
	btn.appendChild(t);

	MAIN.e["actions"] .appendChild(btn);   
	return btn;
}

//
Log.info("Select number of players");
for(var i = 2 ; i<5; i++){
	var btn = addActionBtn(i+" Player(s)");
	btn.onclick = (
		function(i) {
			return function() {
				Game.registerPlayers(i);				
				clearActions();
				Game.initializeRound();
			};
		}
	)(i);	           	
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







