import { get, destroy, post, put } from './methods.js';

const SERVICE_PATH = 'regions';

export async function getRegions(query) {
  const res = await get(SERVICE_PATH, query);
  console.log('getRegions', res);
  return res;
}

export async function getRegion(id, query) {
  const res = await get(`${SERVICE_PATH}/${id}`, query);
  console.log('getRegion', res);
  return res;
}

export async function createRegion(regionData) {
  const res = await post(SERVICE_PATH, regionData);
  console.log('createRegion', res);
  return res;
}

export async function updateRegion(id, regionData) {
  const res = await put(`${SERVICE_PATH}/${id}`, regionData);
  console.log('updateRegion', res);
  return res;
}

export async function deleteRegion(id) {
  const res = await destroy(`${SERVICE_PATH}/${id}`);
  console.log('deleteRegion', res);
  return res;
}

