

Game.registerPlayers(4);		
Display.clearActions();
Game.initializeRound();


function simPlay(){
    while(Game.getCurrentPlayer().hasCubes()){
            
        console.log("Playing for "+ Game.getCurrentPlayer().name);

        var spyCollection = Game.getCurrentPlayer().availableSpyList;    
        let spyCollectionKeys = Array.from(spyCollection.keys());
        var spyId = spyCollectionKeys[0];
        //var spyId = spyCollectionKeys[Math.floor(Math.random() * spyCollectionKeys.length)];
        
        Game.receiveTurnSpyMove(spyId);

        var spaceCollection = Game.availableTurnPlayableSpaces;
        let spaceCollectionKeys = spaceCollection.map( elem => (elem.id));
        var spaceId = spaceCollectionKeys[0];
        //var spaceId = spaceCollectionKeys[Math.floor(Math.random() * spaceCollectionKeys.length)];
        
        Game.receiveTurnSpaceMove(spaceId);
    }   

}
		

simPlay();	
/*
Game.finishRound();
simPlay();			
Game.finishRound();
simPlay();			
Game.finishRound();
simPlay();			
Game.finishRound();
*/

