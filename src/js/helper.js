import { TIMEOUT } from './config.js';

async function loadTimer(timer) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      return reject(new Error('Request took too long.'));
    }, timer * 1000);
  });
}

export async function getJSON(url) {
  try {
    const fetchJSON = fetch(url);
    const res = await Promise.race([fetchJSON, loadTimer(TIMEOUT)]);
    const data = res.json();
    if (!res.ok) throw new Error('Something went wrong in fetching data.');
    return data;
  } catch (err) {
    throw err;
  }
}
