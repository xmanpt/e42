class SpaceVisilibilityEnum {
    constructor(name) {
        this.name = name;
    }
    toString() {
        return `SpaceVisilibilityEnum.${this.name}`;
    }
}
SpaceVisilibilityEnum.NONE = new SpaceVisilibilityEnum('None');
SpaceVisilibilityEnum.LOCAL = new SpaceVisilibilityEnum('Local');
SpaceVisilibilityEnum.ADJACENT = new SpaceVisilibilityEnum('Adjacent');
SpaceVisilibilityEnum.ALL = new SpaceVisilibilityEnum('All');

//console.log(SpaceVisilibilityEnum.LOCAL); // SpaceVisilibilityEnum.LOCAL

// Membership test:
//console.log(SpaceVisilibilityEnum.ALL instanceof SpaceVisilibilityEnum); // true