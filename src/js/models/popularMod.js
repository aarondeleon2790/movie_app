import { APIKEY, APIURL } from '../config.js';
import { getJSON } from '../helper.js';

export const state = {
  popular: {},
  query: [],
  search: {},
};

export async function getPopular() {
  try {
    const data = await getJSON(
      `${APIURL}movie/popular?api_key=${APIKEY}&language=en-USd&page=1`
    );
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

export async function searchQuery(query) {
  try {
    state.query.push(query);
    //prettier-ignore
    const data = await getJSON(`${APIURL}search/movie?api_key=${APIKEY}&query=${query}`);

    const { results } = data;

    state.search = results.map(mov => {
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
    if (state.search.length === 0) throw new Error();
    // if (state.search.length === 0) throw new Error();
  } catch (err) {
    throw err;
  }
}
