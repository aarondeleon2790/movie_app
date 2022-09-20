import { APIURL, APIKEY } from '../config';

export const state = {
  trailer: {},
};

export async function getTrailer(id, mov) {
  try {
    // prettier-ignore
    let res = await fetch(`${APIURL}/${mov}/${id}?api_key=${APIKEY}&append_to_response=videos`);
    // if (!res.ok) {
    //   res = await fetch(
    //     `${APIURL}/tv/${id}?api_key=${APIKEY}&append_to_response=videos`
    //   );
    // }
    if (!res.ok) throw new Error('something went wrong');
    const data = await res.json();
    //prettier-ignore
    const { poster_path, title, videos: { results }} = data;
    if (results.length === 0) {
      state.trailer = {
        title,
        key: { key: false },
        path: poster_path,
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
    };
  } catch (err) {
    alert(err);
  }
}
