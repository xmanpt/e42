class Board {
  constructor(solvSeqNr, name, awardSpacePosition, solvingSequence, spaces, boardAbility ) {
	  this.solvSeqNr = solvSeqNr;
	  this.name = name;
	  this.awardSpacePosition = awardSpacePosition;	  
	  /*   ________
		  |_0_|_1_|
		  |_3_|_2_|
	  */
	  this.solvingSequence = solvingSequence;
	  this.spaces = spaces;
	  this.boardAbility = boardAbility;
	  
	  this.reset();
  }
  
  set awardSpy(spy){
	  this.spaces[this.awardSpacePosition].spy = spy;
  }
  
  get awardSpy(){
	return this.spaces[this.awardSpacePosition].spy;
  }

  reset(){
	  this.card = null;
  }  

  displayBoard(pElem, boardId){
		console.log("displayBoard")
		var boardElem = document.createElement("Board_"+boardId);      
		boardElem.classList.add("board");		
		for(var i = 0; i<this.spaces.length; i++){
			var spaceElem = this.spaces[i].displaySpace(boardElem, boardId, i);
			var solveOrder = this.solvingSequence.indexOf(i);
			if(solveOrder>-1)
				spaceElem.innerHTML += solveOrder;
			if(i==this.awardSpacePosition){
				spaceElem.style.background = "#59363A";
			}

			boardElem.appendChild(spaceElem);		
		}
		return boardElem;
  }

  rotate(r){
	  console.log("rotating " + this+ " : " + r +" rad");
	  this.solvingSequence= this.solvingSequence.map( elem => (elem + r) % 4);

	  var fixedSpace = this.awardSpacePosition!=4 ? null : this.spaces.pop();

	  if(fixedSpace==null){
		  this.awardSpacePosition = (this.awardSpacePosition+r) % this.spaces.length;
	  }

	  for(var i = 0; i < r; i++){
		  var lastSpace = this.spaces.pop();
		  this.spaces.unshift(lastSpace);
	  }

	  if(fixedSpace) this.spaces.push(fixedSpace);
  }

  static generateBoard(boardId){
	switch(boardId){
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