export default class CountriesArray {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    return fetch(`https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,flags,capital,population,languages`)
      .then(responce => {
        return responce.json();
      })
      .then(countries => {
        return countries;
      })
      .catch(error => {
        console.log('', error);
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
