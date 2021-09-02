import {
  mockLogin, mockAuthenticate,
} from './mock.js';

class DWApi {
  constructor(token) {
    this.token = token;
  }

  async login({username, password}) {
    try {
      const res = await mockLogin({username, password});
      const { token, error } = res;

      if (error) return error;

      this.token = token;
      localStorage.setItem('token', token);
      return 'OK';

    } catch (err) {
      return err.error;
    }
  }

  async authenticate() {
    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      const res = await mockAuthenticate(token)

      if (res) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}

export default DWApi;