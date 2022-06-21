export default class CityDB{
  private db: Array<any>;
  private regions: Array<any>;
  private countries: Array<any>;
  constructor(){
    this.db = [{id: 1, lat: 53.9, lon: 27.57, location: 1, country: 0, name: {ru: 'Минск', by: 'Мінск', en: 'Minsk'}},
               {id: 2, lat: 52.43, lon: 30.97, location: 2, country: 0, name: {ru: 'Гомель', by: 'Гомель', en: 'Gomel'}},
               {id: 3, lat: 52.1, lon: 23.7, location: 3, country: 0, name: {ru: 'Брест', by: 'Брэст', en: 'Brest'}},
               {id: 100, lat: 41.64, lon: 41.63, location: 1000, country: 1, name: {ru: 'Батуми', by: 'Батумі', en: 'Batumi'}},
               {id: 101, lat: 41.69, lon: 44.83, location: 1, country: 1, name: {ru: 'Тбилиси', by: 'Тбілісі', en: 'Tbilisi'}}
              ];
    this.regions = [{location: 1, region: null},
                    {location: 2, region: {ru: 'Гомельська область', by: 'Гомельская вобласць', en: 'Gomel Region'}},
                    {location: 3, region: {ru: 'Брестская область', by: 'Брэсцкая вобласць', en: 'Brest Region'}},
                    {location: 1000, region: {ru: 'Аджария', by: 'Аджарыя', en: 'Adjara'}}
                   ];
    this.countries = [
      {ru: 'Беларусь', by: 'Беларусь', en: 'Belarus'},
      {ru: 'Грузия', by: 'Грузія', en: 'Georgia'}
    ]
  }
  findCity(city: string, lang: string): Array<any>{
    city = city.trim();
    let cityListResult: Array<any> = [];
    if (city.length > 0){
      let regexp = new RegExp(`${city}`, 'i');
      this.db.forEach((c) => {
        let result = c.name[lang].match(regexp);
        if (result) {
          let l = this.regions.find((el) => el.location === c.location);
          l = l.region ? `${l.region[lang]}, ${this.countries[c.country][lang]}`: `${this.countries[c.country][lang]}`;
          //const region = this.regions.find((l) => l == c.location); 
          //l = l.region ? `${l.region[lang]}, ${l.country[lang]}`: `${l.country[lang]}`;
          cityListResult.push({id: c.id, name: c.name[lang], region: l, lat: c.lat, lon: c.lon});
        };
      });
    };
    return cityListResult;
  }
}
