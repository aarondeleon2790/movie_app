import * as popularMod from './popularMod.js';
import { APIURL, APIKEY } from '../config';
import { getJSON } from '../helper.js';

export const state = {
  trailer: {},
};

export async function getTrailer(hash) {
  try {
    const srcData = popularMod.state.popular;
    const rand = Math.trunc(Math.random() * srcData.length);
    const id = hash ? hash : srcData[rand].id;
    // const movData = srcData.find(v => v.id === Number(id));
    // const { media } = movData;
    // prettier-ignore
    const data = await getJSON(
      `${APIURL}movie/${id}?api_key=${APIKEY}&append_to_response=videos`
    );
    //prettier-ignore
    const { path, backdrop_path,name,overview,poster_path,title,videos: { results }} = data;
    if (results.length === 0) {
      state.trailer = {
        title,
        key: { key: false },
        img: poster_path,
        overview,
      };
      return;
    }
    const official = results.find(e => {
      return e.name === 'Official Trailer' && e.site === 'YouTube';
    });
    const key = !official ? results[0] : official;
    state.trailer = {
      title,
      key,
      backdrop: backdrop_path,
      name,
      overview,
      img: poster_path,
    };
  } catch (err) {
    throw err;
  }
}
