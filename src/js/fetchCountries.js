export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  ).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error('error');
    }
  });
};
