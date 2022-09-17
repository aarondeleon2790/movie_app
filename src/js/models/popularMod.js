import { APIKEY, APIURL } from '../config.js';

export const state = {
  popular: {},
};

export async function getPopular() {
  try {
    //prettier-ignore
    const res = await fetch(`${APIURL}trending/all/week?api_key=${APIKEY}&page=1`);
    const data = await res.json();
    if (!res.ok) throw new Error('something went wrong');
    const { results } = data;
    console.log(data);
    state.popular = results.map(mov => {
      return {
        id: mov.id,
        title: mov.title,
        name: mov.name,
        releaseDate: mov.release_date,
        poster: mov.poster_path,
        backdrop: mov.backdrop_path,
        overview: mov.overview,
        media: mov.media_type,
      };
    });
  } catch (err) {
    console.log(err.message);
  }
}
