import axios from 'axios';

export const getCountries = () => ({
  type: 'COUNTRIES',
  payload: axios.get('https://corona.lmao.ninja/countries'),
});

export const getConfirm = country => ({
  type: 'CONFIRM',
  payload: axios.get(`https://corona.lmao.ninja/countries/${country}`),
});

export const getAll = () => ({
  type: 'ALL',
  payload: axios.get('https://corona.lmao.ninja/all'),
});
