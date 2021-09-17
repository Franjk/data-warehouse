import { get, destroy, post, put } from './methods.js';

const SERVICE_PATH = 'companies';

export async function getCompanies(query) {
  const res = await get(SERVICE_PATH, query);
  console.log('getCompanies', res);
  return res;
}

export async function getCompany(id, query) {
  const res = await get(`${SERVICE_PATH}/${id}`, query);
  console.log('getCompany', res);
  return res;
}

export async function createCompany(companyData) {
  const res = await post(SERVICE_PATH, companyData);
  console.log('createCompany', res);
  return res;
}

export async function updateCompany(id, companyData) {
  const res = await put(`${SERVICE_PATH}/${id}`, companyData);
  console.log('updateCompany', res);
  return res;
}

export async function deleteCompany(id) {
  const res = await destroy(`${SERVICE_PATH}/${id}`);
  console.log('deleteCompany', res);
  return res;
}

export async function bulkDeleteCompany(idArr) {
  console.log(idArr);
  const res = await destroy(SERVICE_PATH, idArr);
  console.log('bulkDelete', res);
  return res;
}
