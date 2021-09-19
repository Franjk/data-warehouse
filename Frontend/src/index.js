import { authenticate } from './services/auth.service.js';

async function redirect() {
  const res = await authenticate();
  if (!res.err) {
    window.location.replace('../pages/contacts.html');
  } else {
    window.location.replace('../pages/login.html');
  }
}

function initialize() {
  redirect();
}

initialize();