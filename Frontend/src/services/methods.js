const HOST = 'http://localhost:4000/api';

function parseQuery(objQuery) {
  let parsed = '?';
  for (let att in objQuery) {
    parsed += att + '=' + objQuery[att];
  }

  console.log('parsed', parsed);
  return parsed;
}

export async function get(url, query) {
  try {
    const parsedQuery = query ? parseQuery(query) : '';
    const objUrl = new URL(`${HOST}/${url}${parsedQuery}`);
    const token = localStorage.getItem('token') ?? '';
    const res = await fetch(objUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    return data;
  } catch(err) {
    return {err};
  }
}

export async function post(url, body) {
  try {
    const objUrl = new URL(`${HOST}/${url}`);
    const token = localStorage.getItem('token') ?? '';

    const res = await fetch(objUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return {err};
  }
}

export async function put(url, body) {
  try {
    const objUrl = new URL(`${HOST}/${url}`);
    const token = localStorage.getItem('token') ?? '';
    const res = await fetch(objUrl, {
      method: 'PUT', 
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return {err};
  }
}

export async function destroy(url, body = '') {
  try {
    const objUrl = new URL(`${HOST}/${url}`);
    const token = localStorage.getItem('token') ?? '';

    let res;
    if (body) {
      res = await fetch(objUrl, {
        method: 'DELETE', 
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
    } else {
      res = await fetch(objUrl, {method: 'DELETE'});
    }
    const data = await res.json();
    return data;
  } catch(err) {
    return {err};
  }
}
