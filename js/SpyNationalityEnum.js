class SpyNationalityEnum {
    constructor(country) {
        this.country = country;
    }
    toString() {
        return `SpyNationalityEnum.${this.country}`;
    }
}
SpyNationalityEnum.DE = new SpyNationalityEnum('DE');
SpyNationalityEnum.ES = new SpyNationalityEnum('ES');
SpyNationalityEnum.FR = new SpyNationalityEnum('FR');
SpyNationalityEnum.GB = new SpyNationalityEnum('GB');
SpyNationalityEnum.HU = new SpyNationalityEnum('HU');
SpyNationalityEnum.JP = new SpyNationalityEnum('JP');
SpyNationalityEnum.IT = new SpyNationalityEnum('IT');
SpyNationalityEnum.PL = new SpyNationalityEnum('PL');
SpyNationalityEnum.PT = new SpyNationalityEnum('PT');
SpyNationalityEnum.SU = new SpyNationalityEnum('SU');
SpyNationalityEnum.US = new SpyNationalityEnum('US');
SpyNationalityEnum.YU = new SpyNationalityEnum('YU');


//console.log(SpyNationalityEnum.DE); // SpyNationalityEnum.DE

// Membership test:
//console.log(SpyNationalityEnum.GB instanceof SpyNationalityEnum); // true