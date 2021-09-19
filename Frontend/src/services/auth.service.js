import { post } from './methods.js';

const SERVICE_PATH = 'auth';

export async function login(userData) {
  const res = await post(`${SERVICE_PATH}/login`, userData);
  console.log('login', res);
  return res;
}

export async function authenticate() {
  const token = localStorage.getItem('token');

  if (!token) return {err: 'No hay un token guardado'};

  const res = await post(`${SERVICE_PATH}/authenticate`, {token});
  return res;
}
