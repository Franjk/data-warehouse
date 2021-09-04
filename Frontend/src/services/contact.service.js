import { get, destroy, post, put } from './methods.js';

export async function getContacts(query) {
  const res = await get('contacts', query);
  console.log('getContacts', res);
  return res;
}

export async function getContact(id, query) {
  const res = await get(`contacts/${id}`, query);
  console.log('getContact', res);
  return res;
}

export async function createContact(contactData) {
  const res = await post('contacts', contactData);
  console.log('createContact', res);
  return res;
}

export async function updateContact(id, contactData) {
  const res = await put(`contacts/${id}`, contactData);
  console.log('updateContact', res);
  return res;
}

export async function deleteContact(id) {
  const res = await destroy(`contacts/${id}`);
  console.log('deleteContact', res);
  return res;
}