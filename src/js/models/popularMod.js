import { APIKEY, APIURL } from '../config.js';
import { getJSON } from '../helper.js';

export const state = {
  popular: {},
};

export async function getPopular() {
  try {
    //prettier-ignore
    const data = await getJSON(`${APIURL}movie/popular?api_key=${APIKEY}&language=en-USd&page=1`);
    // console.log(data);
    const { results, total_pages: totalPages } = data;
    // use total pages for pagination
    state.popular = results.map(mov => {
      return {
        id: mov.id,
        title: mov.title,
        name: mov.name,
        releaseDate: mov.release_date,
        poster: mov.poster_path,
        backdrop: mov.backdrop_path,
        overview: mov.overview,
      };
    });
  } catch (err) {
    throw err;
  }
}
