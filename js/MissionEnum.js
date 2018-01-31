class MissionEnum {
    constructor(name, points, description ) {
        this.name = name;
		this.points = points;		
		this.description = description ;
    }
    toString() {
        return `MissionEnum.${this.name}`;
    }
}
MissionEnum.MOST_NATIONALISM = new MissionEnum('Most Nationalism' , 6, 'Have the most nationalism abilities');
MissionEnum.MOST_DIPLOMACY = new MissionEnum('Most Diplomacy' , 6, 'Have the most diplomacy abilities');
MissionEnum.MOST_CONSPIRACY = new MissionEnum('Most Conspiracy' , 6, 'Have the most conspiracy abilities');
MissionEnum.MOST_CHARM = new MissionEnum('Most Charm' , 6, 'Have the most charm abilities');
MissionEnum.MOST_ASSASSINS = new MissionEnum('Most Assassins' , 6, 'Have the most assassin abilities');
MissionEnum.MOST_GERMANS = new MissionEnum('Most Germans' , 6, 'Have the most german spies');
MissionEnum.MOST_AMERICANS = new MissionEnum('Most Americans' , 6, 'Have the most american spies');
MissionEnum.MOST_BRITISH = new MissionEnum('Most British' , 6, 'Have the most british spies');
MissionEnum.MOST_PORTUGUESE = new MissionEnum('Most Portuguese' , 6, 'Have the most portuguese spies');
MissionEnum.MOST_WOMEN = new MissionEnum('Most Women' , 6, 'Have the most women spies');
MissionEnum.STRONGEST  = new MissionEnum('Strongest' , 6, 'Have the strongest handset');
MissionEnum.MOST_NATION_DIVERSITY  = new MissionEnum('Most Nation Diversity' , 6, 'Have the most diverse number of nationalities between ES, FR, IT, HU, SU, YO');
MissionEnum.MOST_DA  = new MissionEnum('Most Double Agents' , 6, 'Have the most double agent abilities');
MissionEnum.MOST_DISCARDED  = new MissionEnum('Most Discarded Spies' , 6, 'Have the most discarded spies');


//console.log(MissionEnum.ASSASSIN); // MissionEnum.ASSASSIN

// Membership test:
//console.log(MissionEnum.DIPLOMACY instanceof MissionEnum); // true