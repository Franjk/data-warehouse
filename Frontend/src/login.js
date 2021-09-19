import { $ } from './libs/xQuery/xQuery.js';
import { login } from './services/auth.service.js';


function validateUsername() {
  const username = $('#username').value;
  let msg = '';
  
  if (username.length === 0) {
    msg = 'El nombre de usuario no puede estar vacío.';
    updateErrorMessage('#username-error', msg);
    return false;
  }

  updateErrorMessage('#username-error', msg);
  return true;
}

function validatePassword() {
  const password = $('#password').value;
  let msg = '';

  if (password.length === 0) {
    msg = 'La contraseña no puede estar vacía.';
    updateErrorMessage('#password-error', msg);
    return false;
  }

  updateErrorMessage('#password-error', msg);
  return true;
}

function validateForm() {
  let errorCount = 0;
  if (!validateUsername()) errorCount += 1;
  if (!validatePassword()) errorCount += 1;

  return errorCount === 0;
}

function updateErrorMessage(query, msg) {
  if (msg) {
    $(query)
      .setInnerText(msg)
      .unHide();
  } else {
    $(query)
      .setInnerText('')
      .hide();
  }
}

async function submitForm(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const res = await login({
    username: $('#username').value, 
    password: $('#password').value,
  });

  console.log('login res', res);
  if (res.token) {
    localStorage.setItem('token', res.token);
    window.location.replace('../pages/contacts.html');
  } else {
    updateErrorMessage('#username-error', 'Usuario o contraseña incorrecta');
  }
}



function initialize() {
  $('#username').addEventListener('blur', validateUsername);
  $('#password').addEventListener('blur', validatePassword);
  $('#submit-button').addEventListener('click', submitForm);
  $('#login-form').addEventListener('submit', (e) => e.preventDefault());
}


initialize();