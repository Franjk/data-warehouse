import { get, destroy } from './methods.js';

export async function getCountries(query) {
  const res = await get('countries', query);
  console.log(res);
  return res;
}

export async function deleteCountry(id) {
  const res = await destroy(`countries/${id}`);
  console.log('deleteCountry', res);
  return res;
}