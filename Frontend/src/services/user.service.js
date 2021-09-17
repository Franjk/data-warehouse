import { get, destroy, post, put } from './methods.js';

const SERVICE_PATH = 'users';

export async function getUsers(query) {
  const res = await get(SERVICE_PATH, query);
  console.log('getUsers', res);
  return res;
}

export async function getUser(id, query) {
  const res = await get(`${SERVICE_PATH}/${id}`, query);
  console.log('getUser', res);
  return res;
}

export async function createUser(userData) {
  const res = await post(SERVICE_PATH, userData);
  console.log('createUser', res);
  return res;
}

export async function updateUser(id, userData) {
  const res = await put(`${SERVICE_PATH}/${id}`, userData);
  console.log('updataUser', res);
  return res;
}

export async function deleteUser(id) {
  const res = await destroy(`${SERVICE_PATH}/${id}`);
  console.log('deleteUser', res);
  return res;
}

export async function bulkDeleteUser(idArr) {
  console.log(idArr);
  const res = await destroy(SERVICE_PATH, idArr);
  console.log('bulkDelete', res);
  return res;
}
