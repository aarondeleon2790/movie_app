<<<<<<< HEAD
import { TIMEOUT } from './config.js';

async function loadTimer(timer) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      return reject(new Error('Request took too long.'));
    }, timer * 1000);
=======
import { TIMER } from '../js/config.js';

async function timeOut() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Request took too long. Please reload and try again. ');
    }, TIMER * 1000);
>>>>>>> aea47cb9e392bfe46187358a027eac2fb397fcb0
  });
}

export async function getJSON(url) {
  try {
<<<<<<< HEAD
    const fetchJSON = fetch(url);
    const res = await Promise.race([fetchJSON, loadTimer(TIMEOUT)]);
=======
    const res = await Promise.race([fetch(url), timeOut(TIMER)]);
>>>>>>> aea47cb9e392bfe46187358a027eac2fb397fcb0
    const data = res.json();
    if (!res.ok) throw new Error('Something went wrong in fetching data.');
    return data;
  } catch (err) {
    throw err;
  }
}
