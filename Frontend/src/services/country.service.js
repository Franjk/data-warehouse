import { get, destroy, post, put } from './methods.js';

const SERVICE_PATH = 'countries';

export async function getCountries(query) {
  const res = await get(SERVICE_PATH, query);
  console.log('getCountries', res);
  return res;
}

export async function getCountry(id, query) {
  const res = await get(`${SERVICE_PATH}/${id}`, query);
  console.log('getCountry', res);
  return res;
}

export async function createCountry(countryData) {
  const res = await post(SERVICE_PATH, countryData);
  console.log('createCountry', res);
  return res;
}

export async function updateCountry(id, countryData) {
  const res = await put(`${SERVICE_PATH}/${id}`, countryData);
  console.log('updateCountry', res);
  return res;
}

export async function deleteCountry(id) {
  const res = await destroy(`${SERVICE_PATH}/${id}`);
  console.log('deleteCountry', res);
  return res;
}

