

Game.registerPlayers(4);				
clearActions();
Game.initializeRound();


while(Game.playerList[Game.currentPlayerTurn].hasCubes()){
    
    var currPlayer= Game.playerList[Game.currentPlayerTurn];
    console.log("Playing for "+ currPlayer.name);

    var spyCollection = currPlayer.availableSpyList;    
    let spyCollectionKeys = Array.from(spyCollection.keys());
    var spyId =  spyCollectionKeys[Math.floor(Math.random() * spyCollectionKeys.length)];
    
    Game.receiveTurnSpyMove(spyId);

    var spaceCollection = Game.availableTurnPlayableSpaces;
    let spaceCollectionKeys = spaceCollection.map( elem => (elem.id));
    var spaceId = spaceCollectionKeys[Math.floor(Math.random() * spaceCollectionKeys.length)];

    Game.receiveTurnSpaceMove(spaceId);

}
