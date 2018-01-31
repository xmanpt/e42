class BoardAbilityEnum {
    constructor(name) {
        this.name = name;
    }
    toString() {
        return `BoardAbilityEnum.${this.name}`;
    }
}
BoardAbilityEnum.NO_MURDERS = new BoardAbilityEnum('NO MURDERS');
BoardAbilityEnum.BRITISH_INCREASE_STRENGTH = new BoardAbilityEnum('BRITISH INCREASE STRENGTH');
BoardAbilityEnum.NONE = new BoardAbilityEnum('NONE');
BoardAbilityEnum.GERMAN_INCREASE_STRENGTH = new BoardAbilityEnum('GERMAN INCREASE STRENGTH');
BoardAbilityEnum.ALL_EXTERIOR = new BoardAbilityEnum('ALL EXTERIOR');
BoardAbilityEnum.DICE = new BoardAbilityEnum('DICE');
BoardAbilityEnum.WEAKER_DISCARDS = new BoardAbilityEnum('WEAKER DISCARDS');



//console.log(BoardAbilityEnum.NO_MURDERS); // BoardAbilityEnum.NO_MURDERS

// Membership test:
//console.log(BoardAbilityEnum.NO_MURDERS instanceof BoardAbilityEnum); // true