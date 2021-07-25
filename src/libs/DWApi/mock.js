export function mockLogin({username, password}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'fran' && password === '123') {
        resolve({token: 'token'})
      } else {
        reject({error: 'Credenciales invalidas'})
      }
    }, 500)
  })
}

export function mockAuthenticate(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === 'token') {
        resolve(true);
      } else {
        reject(false);
      }
    }, 500);
  })
}