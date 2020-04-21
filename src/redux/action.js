import axios from 'axios';

export const getCountries = () => ({
  type: 'COUNTRIES',
  payload: axios.get('https://corona.lmao.ninja/countries'),
});

export const getConfirm = country => ({
  type: 'CONFIRM',
  payload: axios.get(`https://corona.lmao.ninja/countries/${country}`),
});

export const getIndonesiaData = () => ({
  type: 'INA',
  payload: axios.get('https://api.kawalcorona.com/indonesia/'),
});

export const getAll = () => ({
  type: 'ALL',
  payload: axios.get('https://corona.lmao.ninja/all'),
});

export const getProv = () => ({
  type: 'PROV',
  payload: axios.get('https://api.kawalcorona.com/indonesia/provinsi/'),
});
