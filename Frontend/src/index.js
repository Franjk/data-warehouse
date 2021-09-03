import DWApi from './libs/DWApi/DWApi.js';

const dw = new DWApi();

async function redirect() {
  const res = await dw.authenticate();
  if (res) {
    window.location.replace('../pages/contacts.html');
  } else {
    window.location.replace('../pages/login.html');
  }
}

function initialize() {
  redirect();
}

initialize();