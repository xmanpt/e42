const SpyNationalityEnum = Object.freeze({
    
    DE: { name: "DE"},
    ES: { name: "ES"},
    FR: { name: "FR"},
    GB: { name: "GB"},
    HU: { name: "HU"},
    JP: { name: "JP"},
    IT: { name: "IT"},
    PL: { name: "PL"},
    PT: { name: "PT"},
    SU: { name: "SU"},
    US: { name: "US"},
    YU: { name: "YU"},

});
   

function checkSpyNationality(spyNationalityEnum) {
    switch (spyNationality) {
      case SpyNationalityEnum.DE: 
         document.write(spyNationality.name);
         break;
      default: 
         document.write("Unknown color");
    }
  }
  

