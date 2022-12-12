import '../css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const input = document.querySelector('input');
const list = document.querySelector('ul');
const DEBOUNCE_DELAY = 300;

const renderFlagAndName = (imgSrc, countryName) => {
  list.insertAdjacentHTML(
    'beforeend',
    `<li class="list-item"> <img src="${imgSrc}" alt="${countryName} flag"> ${countryName}</li>`
  );
};
const renderCountryDetails = (cap, pop, lang) => {
  list.insertAdjacentHTML(
    'beforeend',
    `<li class="list-item">  <span class="item-label">Capital:</span>  ${cap}</li><li class="list-item"> <span class="item-label">Population:</span>  ${pop}</li><li class="list-item"> <span class="item-label">Languages:</span>  ${lang}</li>`
  );
};

const inputHandle = () => {
  const name = input.value;
  list.innerHTML = '';
  fetchCountries(name)
    .then(array => {
      if (array.length === 0) {
        console.log('Oops. There is no country with that name.');
      } else if (array.length > 4) {
        console.log('too many matches found');
      } else if (array.length === 1) {
        array.map(el => {
          renderFlagAndName(el.flags.png, el.name.common);
          let langs = Object.values(el.languages);
          renderCountryDetails(el.capital, el.population, langs);
        });
      } else {
        array.map(el => {
          console.log(el);
          renderFlagAndName(el.flags.png, el.name.common);
        });
      }
    })
    .catch(() => {
      console.log('errrrrorrr');
    });
};

input.addEventListener('input', debounce(inputHandle, DEBOUNCE_DELAY));
