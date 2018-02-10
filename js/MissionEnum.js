const MissionEnum = Object.freeze({
    MOST_NATIONALISM: { name: "Most Nationalism", points: 6, description: "Have the most nationalism abilities"},
    MOST_DIPLOMACY: { name: "Most Diplomacy", points: 6, description: "Have the most diplomacy abilities"},
    MOST_CONSPIRACY: { name: "Most Conspiracy", points: 6, description: "Have the most conspiracy abilities"},
    MOST_CHARM: { name: "Most Charm", points: 6, description: "Have the most charm abilities"},
    MOST_ASSASSINS: { name: "Most Assassins", points: 6, description: "Have the most assassin abilities"},
    MOST_GERMANS: { name: "Most Germans", points: 6, description: "Have the most german spies"},
    MOST_AMERICANS: { name: "Most Americans", points: 6, description: "Have the most american spies"},
    MOST_BRITISH: { name: "Most British", points: 6, description: "Have the most british spies"},
    MOST_PORTUGUESE: { name: "Most Portuguese", points: 6, description: "Have the most portuguese spies"},
    MOST_WOMEN: { name: "Most Women", points: 6, description: "Have the most women spies"},
    STRONGEST : { name: "Strongest", points: 6, description: "Have the strongest handset"},
    MOST_NATION_DIVERSITY : { name: "Most Nation Diversity", points: 6, description: "Have the most diverse number of nationalities between ES, FR, IT, HU, SU, YO"},
    MOST_DA : { name: "Most Double Agents", points: 6, description: "Have the most double agent abilities"},
    MOST_DISCARDED : { name: "Most Discarded Spies", points: 6, description: "Have the most discarded spies"},
});
    

function checkMission(mission) {
  switch (mission) {
    case MissionEnum.NONE: 
       document.write(mission.name);
       break;
    default: 
       document.write("Unknown color");
  }
}

