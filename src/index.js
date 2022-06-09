import './css/styles.css';
import debounce from 'debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CountriesArray from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const countriesArray = new CountriesArray();

const refs = {
  input: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  counrtyInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  if ( e.target.value == 0) {
    return refs.countriesList.innerHTML = '';
  }

  countriesArray.query = e.target.value;
  countriesArray.fetchCountries().then(countries => {
    if (countries.length > 10) {
      return Notify.info('Too many matches found. Please enter a more specific name.');
    }
    else if (countries.length == 1) {
      return (refs.countriesList.innerHTML = makeMurkupCountryCard(countries));
    }
    else if (countries.length <= 10) {
      return (refs.countriesList.innerHTML = countries.map(makeMurkupCountriesList).join(''));
    } 
      return Notify.failure("Oops, there is no country with that name");
  });
}

function makeMurkupCountriesList({ flags, name }) {
  return `<li class='countries-item'>
  <img width='60' src=${flags.svg} alt='' />
  <p class='country-name'>${name.official}</p>
</li>`;
}

function makeMurkupCountryCard([{ flags, name, capital, population, languages }]) {
  return `<li class='country-item'>
  <div class="country-item__main-about">
    <img width='70' heigth='50' src=${flags.svg} alt='' />
    <h2 class='country-name'>${name.common}</h2>
  </div>
  <div>
    <p><span class="country-item__accent"> Capital:</span> ${capital}</p>
    <p><span class="country-item__accent">Population:</span> ${population}</p>
    <p><span class="country-item__accent">Languages:</span> ${Object.values(languages).join(
      ', ',
    )}</p>
  </div>
</li>`;
}
