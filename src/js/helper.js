// add settimeout for fetching

export async function getJSON(url) {
  try {
    const res = await fetch(url);
    const data = res.json();
    if (!res.ok) throw new Error('something went wrong');
    return data;
  } catch (err) {
    throw err;
  }
}
