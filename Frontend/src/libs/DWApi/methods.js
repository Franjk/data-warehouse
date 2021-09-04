const HOST = 'http://localhost:4000/api';

export async function get(url) {
  console.log(url);
  console.log(`${HOST}/${url}`);
  try {
    const objUrl = new URL(`${HOST}/${url}`);
    console.log(objUrl);
    const res = await fetch(objUrl);
    const data = await res.json();
    console.log(data);
    return data;
  } catch(err) {
    return err;
  }
}