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
    const res = await fetch(objUrl);
    const data = await res.json();
    return data;
  } catch(err) {
    return {err};
  }
}

export async function post(url, body) {
  try {
    console.log('post', JSON.stringify(body));
    const objUrl = new URL(`${HOST}/${url}`);

    const res = await fetch(objUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    const res = await fetch(objUrl, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
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
    console.log(JSON.stringify(body));
    const res = await fetch(objUrl, {
      method: 'DELETE', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return data;
  } catch(err) {
    return {err};
  }
}
