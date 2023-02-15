import { APIKEY, APIURL } from '../config.js';
import { getJSON } from '../helper.js';

export const state = {
  popular: [],
  currentPage: [],
};

export async function getPopular(page) {
  try {
    const queryPage = page || 1;
    //prettier-ignore
    const data = await getJSON(`${APIURL}movie/popular?api_key=${APIKEY}&language=en-USd&page=${queryPage}`);
    const { results, total_pages: totalPages } = data;
    // use total pages for pagination
    // const popular = [];
    state.popular = [
      ...state.popular,
      ...results.map(result => {
        return {
          id: result.id,
          title: result.title,
          name: result.name,
          releaseDate: result.release_date,
          poster: result.poster_path,
          backdrop: result.backdrop_path,
          overview: result.overview,
        };
      }),
    ];

    // state.popular = results.map(mov => {
    //   return {
    //     id: mov.id,
    //     title: mov.title,
    //     name: mov.name,
    //     releaseDate: mov.release_date,
    //     poster: mov.poster_path,
    //     backdrop: mov.backdrop_path,
    //     overview: mov.overview,
    //   };
    // });
    const start = (queryPage - 1) * 20;
    const end = queryPage * 20;
    state.currentPage = state.popular.slice(start, end);
  } catch (err) {
    throw err;
  }
}

export async function loadPage(page) {
  const data = await getJSON(
    `${APIURL}movie/popular?api_key=${APIKEY}&language=en-USd&page=${page}`
  );
  const { results } = data;

  state.currentPage = results.map(mov => {
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
  state.popular = [...state.popular, ...state.currentPage];
}
