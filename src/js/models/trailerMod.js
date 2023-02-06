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
    //FIX CODE
    // console.log(data);

    //prettier-ignore
    // const { videos: { results } } = data;
    // path,
    // backdrop_path,
    // name,
    // overview,
    // poster_path,
    // title,
    console.log(data.videos.results);
    if (data.results.length === 0) {
      state.trailer = {
        title,
        key: { key: false },
        img: poster_path,
        overview,
      };
    }

    const official = results.find(result => {
      return result.name === 'Official Trailer' && e.site === 'YouTube';
    });
    const key = !official ? results[0] : official;
    state.trailer = {
      title: data.title,
      key: data.key,
      backdrop: data.backdrop_path,
      nameProp: data.name,
      overview: data.overview,
      img: data.poster_path,
    };
  } catch (err) {
    throw err;
  }
}
