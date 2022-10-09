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
      // `${APIURL}movie/popular?api_key=${APIKEY}&language=en-US&page=1`
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
      };
    });
  } catch (err) {
    throw new Error(err);
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
  } catch (err) {
    console.log(err);
    throw err;
  }
}
