import * as popularMod from './popularMod.js';
import { APIURL, APIKEY } from '../config';
import { getJSON } from '../helper.js';

export const state = {
  trailer: {},
};

export async function getTrailer(hash) {
  try {
    //generating random hash/id onpage load
    const srcData = popularMod.state.popular;
    const rand = Math.trunc(Math.random() * srcData.length);
    //

    const id = hash || srcData[rand].id;

    // prettier-ignore
    const data = await getJSON(
      `${APIURL}movie/${id}?api_key=${APIKEY}&append_to_response=videos`
    );

    // console.log(data);

    //code is fixed!!!!!
    if (data.videos.results.length === 0) {
      state.trailer = {
        title: data.title,
        key: false,
        img: data.poster_path,
        overview: data.overview,
      };
      return;
    }
    const official = data.videos.results.find(result => {
      return result.name === 'Official Trailer' && result.site === 'YouTube';
    });
    const key = official || data.videos.results[0];
    state.trailer = {
      title: data.title,
      key: key,
      backdrop: data.backdrop_path,
      nameProp: data.name,
      overview: data.overview,
      img: data.poster_path,
    };
    // console.log(state.trailer);
  } catch (err) {
    throw err;
  }
}
