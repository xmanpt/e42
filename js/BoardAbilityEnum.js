const BoardAbilityEnum = Object.freeze({
    NO_MURDERS: { name: "NO MURDERS"}, 
    BRITISH_INCREASE_STRENGTH : { name: "BRITISH INCREASE STRENGTH"},
    NONE : { name: "NONE"},
    GERMAN_INCREASE_STRENGTH : { name: "GERMAN INCREASE STRENGTH"},
    ALL_EXTERIOR : { name: "ALL EXTERIOR"},
    DICE : { name: "DICE"},
    WEAKER_DISCARDS : { name: "WEAKER DISCARDS"},
    NATIONALISM_INCREASE_STRENGTH : { name: "NATIONALISM INCREASE STRENGTH"},
    ROTATE_AFTER_PLAY : { name: "ROTATE BOARD AFTER PLAY"},
});
    

function checkBoardAbility(boardAbility) {
  switch (boardAbility) {
    case BoardAbilityEnum.NO_MURDERS: 
       document.write(boardAbility.name);
       break;
    default: 
       document.write("Unknown color");
  }
}


