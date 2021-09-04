import { get, destroy } from './methods.js';

export async function getCities(query) {
  const res = await get('cities', query);
  console.log(res);
  return res;
}

export async function deleteCity(id) {
  const res = await destroy(`cities/${id}`);
  console.log('deleteRegion', res);
  return res;
}