import { APIKEY, APIURL } from '../config.js';
import { getJSON } from '../helper.js';

export const state = {
  groupPages: {},
  currentGroup: [],
  currentPage: '',
};

export async function addPopular(page = 1) {
  try {
    const queryPage = page || 1;
    //prettier-ignore
    const data = await getJSON(`${APIURL}movie/popular?api_key=${APIKEY}&language=en-USd&page=${page}`);
    // console.log(data);
    const { results, total_pages: totalPages } = data;
    // use total pages for pagination
    // state.popular = [
    //   ...state.popular,
    //   ...results.map(mov => {
    //     return {
    //       id: mov.id,
    //       title: mov.title,
    //       name: mov.name,
    //       releaseDate: mov.release_date,
    //       poster: mov.poster_path,
    //       backdrop: mov.backdrop_path,
    //       overview: mov.overview,
    //     };
    //   }),
    // ];
    state.groupPages[`group${queryPage}`] = results.map(mov => {
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
  } catch (err) {
    throw err;
  }
}

export async function getPageResult(page) {
  state.currentPage = page;
  if (!state.groupPages.hasOwnProperty(`group${page}`)) {
    await addPopular(page);
  }
  state.currentGroup = state.currentGroup = state.groupPages[`group${page}`];

  // state.currentGroup = state.groupPages[`group${page}`];
  // const start = (page - 1) * 20;
  // const end = page * 20;
  // await addPopular(page);
  // state.loadedPages = page;
  // state.currentPageGroup = state.popular.slice(start, end);
}
