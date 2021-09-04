import { get, destroy } from './methods.js';

export async function getCompanies(query) {
  const res = await get('companies', query);
  console.log('getCompanies', res);
  return res;
}

export async function deleteCompany(id) {
  const res = await destroy(`companies/${id}`);
  console.log('deleteCompany', res);
  return res;
}