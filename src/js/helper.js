import { TIMER } from '../js/config.js';

async function timeOut() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Request took too long. Please reload and try again. ');
    }, TIMER * 1000);
  });
}

export async function getJSON(url) {
  try {
    const res = await Promise.race([fetch(url), timeOut(TIMER)]);
    const data = res.json();
    if (!res.ok) throw new Error('Something went wrong in fetching data.');
    return data;
  } catch (err) {
    throw err;
  }
}
