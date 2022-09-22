import { APIKEY, APIURL } from '../config.js';
import { getJSON } from '../helper.js';

export const state = {
  popular: {},
};

export async function getPopular() {
  try {
    const data = await getJSON(
      `${APIURL}trending/all/week?api_key=${APIKEY}&page=1`
    );
    const { results } = data;
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
    alert(err.message);
  }
}
