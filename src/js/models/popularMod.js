import { APIKEY, APIURL, MAXPAGERESULT } from '../config.js';
import { getJSON } from '../helper.js';

export const state = {
  groupPages: {},
  currentGroup: [],
  currentPage: '',
  totalPages: MAXPAGERESULT,
};

export async function loadPopular() {
  try {
    //prettier-ignore
    const data = await getJSON(`${APIURL}movie/popular?api_key=${APIKEY}&language=en-USd&page=1`);
    const { results, total_pages: totalPages } = data;
    state.groupPages.group1 = results.map(mov => {
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
    state.currentPage = 1;
    state.currentGroup = state.groupPages.group1;
  } catch (err) {
    throw err;
  }
}

export async function getPageResult(page) {
  if (!state.groupPages.hasOwnProperty(`group${page}`)) {
    const data = await getJSON(
      `${APIURL}movie/popular?api_key=${APIKEY}&language=en-USd&page=${page}`
    );
    const { results } = data;
    state.groupPages[`group${page}`] = results.map(mov => {
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
    state.currentGroup = state.groupPages[`group${page}`];
  }

  state.currentGroup = state.groupPages[`group${page}`];
  state.currentPage = page;
}
