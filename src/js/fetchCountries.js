import axios from 'axios';
// export const fetchCountries = name => {
//   return fetch(
//     `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
//   ).then(resp => {
//     if (resp.ok) {
//       return resp.json();
//     } else {
//       throw new Error('error');
//     }
//   });
// };

export const fetchCountries = name => {
  return axios
    .get(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`,
      name
    )
    .then(({ data }) => {
      return data;
    });
};
