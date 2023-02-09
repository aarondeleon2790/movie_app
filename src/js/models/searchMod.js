import { APIURL, APIKEY } from '../config';
import { getJSON } from '../helper';

export const state = {
  searchResults: [],
  query: [],
};

export async function searchQuery(query) {
  try {
    state.query.push(query);
    console.log(state.query);
    //prettier-ignore
    const data = await getJSON(`${APIURL}search/movie?api_key=${APIKEY}&query=${query}`);
    const { results } = data;
    console.log(data);
    if (results.length === 0) {
      throw new Error();
    }
    state.searchResults = results.map(mov => {
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
    err.message = query;
    throw err;
  }
}
