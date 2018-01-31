class SpyAbilityEnum {
    constructor(name) {
        this.name = name;
    }
    toString() {
        return `SpyAbilityEnum.${this.name}`;
    }
}
SpyAbilityEnum.ASSASSIN = new SpyAbilityEnum('Assassin');
SpyAbilityEnum.CHARM = new SpyAbilityEnum('Charm');
SpyAbilityEnum.CONSPIRACY = new SpyAbilityEnum('Conspiracy');
SpyAbilityEnum.DIPLOMACY = new SpyAbilityEnum('Diplomacy');
SpyAbilityEnum.NATIONALISM = new SpyAbilityEnum('Nationalism');
SpyAbilityEnum.WOMAN = new SpyAbilityEnum('Woman');
SpyAbilityEnum.DA = new SpyAbilityEnum('Double Agent');


//console.log(SpyAbilityEnum.ASSASSIN); // SpyAbilityEnum.ASSASSIN

// Membership test:
//console.log(SpyAbilityEnum.DIPLOMACY instanceof SpyAbilityEnum); // true