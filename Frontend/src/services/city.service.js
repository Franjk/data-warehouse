import { get, destroy, post, put } from './methods.js';

const SERVICE_PATH = 'cities';

export async function getCities(query) {
  const res = await get(SERVICE_PATH, query);
  console.log('getCities', res);
  return res;
}

export async function getCity(id, query) {
  const res = await get(`${SERVICE_PATH}/${id}`, query);
  console.log('getCity', res);
  return res;
}

export async function createCity(cityData) {
  const res = await post(SERVICE_PATH, cityData);
  console.log('createCity', res);
  return res;
}

export async function updateCity(id, cityData) {
  const res = await put(`${SERVICE_PATH}/${id}`, cityData);
  console.log('updateCity', res);
  return res;
}

export async function deleteCity(id) {
  const res = await destroy(`${SERVICE_PATH}/${id}`);
  console.log('deleteCity', res);
  return res;
}

