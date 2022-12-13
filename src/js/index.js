import '../css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const input = document.querySelector('input');
const list = document.querySelector('ul');
const DEBOUNCE_DELAY = 300;
let type;

const renderFlagAndName = (imgSrc, countryName) => {
  list.insertAdjacentHTML(
    'beforeend',
    `<li class="list-item country-name">
    <img src="${imgSrc}" alt="${countryName} flag">
    ${countryName}</li>`
  );
};
const renderCountryDetails = (capital, population, language) => {
  list.insertAdjacentHTML(
    'beforeend',
    `<li class="list-item"><span class="item-label">Capital:</span>${capital}</li>
    <li class="list-item"><span class="item-label">Population:</span> ${population}</li>
    <li class="list-item"> <span class="item-label">Languages:</span>  ${language}</li>`
  );
};

const inputHandle = () => {
  list.innerHTML = '';

  fetchCountries(input.value.trim())
    .then(array => {
      if (array.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
      } else if (array.length === 1) {
        array.map(({ flags, name, capital, population, languages }) => {
          renderFlagAndName(flags.svg, name.official);
          renderCountryDetails(capital, population, Object.values(languages));
        });
      } else {
        array.map(({ flags, name }) => {
          renderFlagAndName(flags.svg, name.official);
        });
      }
    })
    .catch(() => {
      Notify.failure('Oops. There is no country with that name.');
    });
};

input.addEventListener('input', debounce(inputHandle, DEBOUNCE_DELAY));
