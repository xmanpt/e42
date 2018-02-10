class Board {
  constructor(solvSeqNr, name, awardSpacePosition, solvingSequence, spaces, boardAbility ) {
	  this.solvSeqNr = solvSeqNr;
	  this.name = name;
	  this.awardSpacePosition = awardSpacePosition;	  	  
	  this.solvingSequence = solvingSequence;
	  this.boardAbility = boardAbility;


	  this.boardSpaces = [];
	  for(var i = 0; i<spaces.length; i++ ){
			this.boardSpaces.push(new BoardSpace(spaces[i]));
	  }
	  
	  this.reset();
  }
  
  set awardSpy(spy){
	  this.boardSpaces[this.awardSpacePosition].space.spy = spy;
  }
  
  get awardSpy(){
	return this.boardSpaces[this.awardSpacePosition].space.spy;
  }

  reset(){
	  this.card = null;
  }  

  

  rotate(r){
	  //console.log("rotating " + this+ " : " + r +" rad");
	  this.solvingSequence= this.solvingSequence.map( elem => (elem + r) % 4);

	  var fixedSpace = this.awardSpacePosition!=4 ? null : this.boardSpaces.pop();

	  if(fixedSpace==null){
		  this.awardSpacePosition = (this.awardSpacePosition+r) % this.boardSpaces.length;
	  }

	  for(var i = 0; i < r; i++){
		  var lastSpace = this.boardSpaces.pop();
		  this.boardSpaces.unshift(lastSpace);
	  }

	  if(fixedSpace) this.boardSpaces.push(fixedSpace);
  }



  static generateBoard(boardId){
	switch(boardId){
		case 0: return new Board(0, "Alcantâra, Lisboa", 2, [3, 0, 1], [
			new Space(false, SpaceVisilibilityEnum.LOCAL),
			new Space(false, SpaceVisilibilityEnum.ADJACENT),
			new Space(true, SpaceVisilibilityEnum.NONE),
			new Space(false, SpaceVisilibilityEnum.NONE)
			], BoardAbilityEnum.ROTATE_AFTER_PLAY);
		case 1: return new Board(1, "Sto. António do Estoril", 0, [1, 2, 3], [
			new Space(false, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.LOCAL),
			new Space(true, SpaceVisilibilityEnum.ADJACENT)
			], BoardAbilityEnum.NO_MURDERS);
		case 2: return new Board(2, "Hotel Palácio", 1, [2, 3, 0], [
			new Space(true, SpaceVisilibilityEnum.ADJACENT),
			new Space(true, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.LOCAL)
			], BoardAbilityEnum.BRITISH_INCREASE_STRENGTH);		
		case 3 : return new Board(3, "Tamariz", 2, [3, 0, 1], [
			new Space(false, SpaceVisilibilityEnum.NONE),
			new Space(false, SpaceVisilibilityEnum.NONE),
			new Space(false, SpaceVisilibilityEnum.NONE),
			new Space(false, SpaceVisilibilityEnum.NONE)
			], BoardAbilityEnum.NONE);	
		case 4 : return new Board(4, "Hotel Atlântico", 3, [0, 1, 2], [
			new Space(true, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.LOCAL),
			new Space(true, SpaceVisilibilityEnum.ADJACENT),
			new Space(false, SpaceVisilibilityEnum.NONE)
			], BoardAbilityEnum.GERMAN_INCREASE_STRENGTH);		
		case 5 : return new Board(5, "Muchaxo", 0, [3, 1, 2], [
			new Space(false, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.LOCAL),
			new Space(true, SpaceVisilibilityEnum.ADJACENT),
			new Space(true, SpaceVisilibilityEnum.NONE)
			], BoardAbilityEnum.ALL_EXTERIOR);		
		case 6 : return new Board(6, "Casino Estoril", 1, [3, 0, 2], [
			new Space(true, SpaceVisilibilityEnum.LOCAL),
			new Space(false, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.ADJACENT),
			new Space(true, SpaceVisilibilityEnum.NONE)
			], BoardAbilityEnum.DICE);	
		case 7 : return new Board(7, "Boca do Inferno", 2, [3, 1, 0], [
			new Space(true, SpaceVisilibilityEnum.ADJACENT),
			new Space(true, SpaceVisilibilityEnum.LOCAL),
			new Space(false, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.NONE)
			], BoardAbilityEnum.WEAKER_DISCARDS);		
		case 8 : return new Board(8, "Museu Conde Castro Guimarães", 4, [0, 1, 2, 3], [
			new Space(true, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.LOCAL),
			new Space(true, SpaceVisilibilityEnum.ADJACENT),
			new Space(true, SpaceVisilibilityEnum.ALL),
			new Space(true, SpaceVisilibilityEnum.NONE)
			], BoardAbilityEnum.NONE);		
		case 9 : return new Board(9, "Hotel Avenida Palace, Lisboa", 0, [3, 1, 2], [
			new Space(false, SpaceVisilibilityEnum.NONE),
			new Space(true, SpaceVisilibilityEnum.LOCAL),
			new Space(true, SpaceVisilibilityEnum.ADJACENT),
			new Space(true, SpaceVisilibilityEnum.NONE)
			], BoardAbilityEnum.NATIONALISM_INCREASE_STRENGTH);				
		}
	  }
	  
	static compare(a,b) {
		if (a.solvSeqNr < b.solvSeqNr)
		  return -1;
		if (a.solvSeqNr > b.solvSeqNr)
		  return 1;
		return 0;
	 } 

	  
}