import { get, destroy } from './methods.js';

export async function getAllContacts(query) {
  const res = await get('contacts', query);
  console.log(res);
  return res;
}

export async function deleteContact(id) {
  const res = await destroy(`contacts/${id}`);
  console.log('deleteContact', res);
  return res;
}