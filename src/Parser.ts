class Parser {
  private key: string;
  constructor(){
    this.key = 'ec999c7980c027b0a0cadf18741c1d95';
  }

  async parseWeatherData(lat: number, lon: number): Promise<Array<any>> {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${this.key}`);
    const data = await response.json();
    return data;
  }
  async parseNameByGeo(lat: number, lon: number): Promise<Array<any>> {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=${this.key}`);
    const data = await response.json();
    return data;
  }
}

export default Parser;
/*
export async function parseWeatherData(lat: number, lon: number, units: string): Promise<Array<any>> {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&appid=ec999c7980c027b0a0cadf18741c1d95`);
  const data = await response.json();
  return data;
}
export async function parseNameByGeo(lat: number, lon: number): Promise<Array<any>> {
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=ec999c7980c027b0a0cadf18741c1d95`);
  const data = await response.json();
  return data;
}*/
