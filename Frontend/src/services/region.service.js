import { get, destroy } from './methods.js';

export async function getRegions(query) {
  const res = await get('regions', query);
  console.log(res);
  return res;
}

export async function deleteRegion(id) {
  const res = await destroy(`regions/${id}`);
  console.log('deleteRegion', res);
  return res;
}