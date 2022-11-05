import '../../node_modules/normalize.css';
import '../css/style.css';
import * as popularMod from './models/popularMod.js';
import * as trailerMod from './models/trailerMod.js';
import PopularView from './views/popularView.js';
import TrailerView from './views/trailerView';
import OverView from './views/overView';
import SearchView from './views/searchView';
import ResultView from './views/resultView';
import popularView from './views/popularView.js';
import trailerView from './views/trailerView';
import resultView from './views/resultView';
import { timeOut } from './helper';
const movList = document.querySelector('.mov-list-container');
const movImg = document.querySelector('.mov-img');
const banner = document.querySelector('.banner');
if (module.hot) {
  module.hot.accept();
}

// async function getMovies() {
//   window.location.hash = '';
//   try {
//     //prettier-ignore
//     const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&page=1`);
//     const data = await res.json();
//     if (!res.ok) throw new Error('something went wrong');
//     console.log(data);
//     displayMovies(data);
//   } catch (err) {
//     console.error(err.message);
//   }
// }

// function displayMovies(data) {
//   const { results } = data;
//   const movListItem = results
//     .map(mov => {
//       const title = mov.title ?? mov.name;
//       return ` <div class="mov-list-card">
//       <div class="mov-img-container">
//         <a href="#${mov.id}">
//         <img class="mov-img" src="${
//           IMGURL + mov.poster_path
//         }" alt="poster image of ${title}">
//         <a/>
//       </div>
//       <div class="mov-list-description">
//         <h3>${title}</h3>
//         <p>Genre / ${mov.release_date}</p>
//       </div>
//       </div>`;
//     })
//     .join('');
//   movList.innerHTML = '';
//   movList.insertAdjacentHTML('afterbegin', movListItem);
// }

//results > array(2)
//backdrop_path: "/5QEtCBM6aXHftr7sgFxxUUl9Ej8.jpg"
// adult: false
// backdrop_path: "/5QEtCBM6aXHftr7sgFxxUUl9Ej8.jpg"
// genre_ids: (4) [80, 18, 53, 28]
// id: 75780
// original_language: "en"
// original_title: "Jack Reacher"
// overview: "When a gunman takes five lives with six shots, all evidence points to the suspect in custody. On interrogation, the suspect offers up a single note: \"Get Jack Reacher!\" So begins an extraordinary chase for the truth, pitting Jack Reacher against an unexpected enemy, with a skill for violence and a secret to keep."
// popularity: 98.455
// poster_path: "/uQBbjrLVsUibWxNDGA4Czzo8lwz.jpg"
// release_date: "2012-12-20"
// title: "Jack Reacher"
// video: false
// vote_average: 6.6
// vote_count: 5952

// radio buttons

const radio = document.querySelector('.radio-container');

radio.addEventListener('click', function (e) {
  if (e.target.name) {
    console.log(e.target.value);
  }
});

//hash change event
//change haschange event to click event on movies
// window.addEventListener('hashchange', async () => {
//   window.scrollTo({ top: 0 });
//   const id = window.location.hash.slice(1);
//   await TrailerMod.getTrailer(id);
//   TrailerView.render(TrailerMod.state.trailer);
// });

// async function displayTrailer(id, media) {
//   await trailermod.getTrailer(id, media);
//   TrailerView.render(trailermod.state.trailer);
//   window.scrollTo({ top: 0 });
// }

// movList.addEventListener('click', async e => {
//   if (!e.target.classList.contains('mov-img')) {
//     return;
//   }

//   const id = e.target.getAttribute('id');
//   const media = e.target.getAttribute('data-media');
//   await trailermod.getTrailer(id, media);
//   TrailerView.render(trailermod.state.trailer);
//   window.scrollTo({ top: 0 });
// });

// ['load', 'hashchange'].forEach(ev => {
//   window.addEventListener(ev, eventHandlers);
// });

async function loadPopular() {
  try {
    await popularMod.getPopular();
    PopularView.render(popularMod.state.popular);
  } catch (err) {
    console.log(err);
    PopularView.renderError(err);
  }
}

async function onLoadHashTrailer() {
  try {
    const hash = window.location.hash.slice(1);
    await trailerMod.getTrailer(hash);
    TrailerView.render(trailerMod.state.trailer);
    OverView.render(trailerMod.state.trailer);
  } catch (err) {
    trailerView.renderError(err);
  }
}

async function loadTrailer() {
  try {
    const id = window.location.hash.slice(1);
    await trailerMod.getTrailer(id);
    TrailerView.render(trailerMod.state.trailer);
    OverView.render(trailerMod.state.trailer);

    window.scrollTo({ top: 0 });
  } catch (err) {
    trailerView.renderError(err);
  }
}

async function loadSearch(query) {
  try {
    console.log(query);
    if (!query) return;
    await popularMod.searchQuery(query);
    ResultView.render(popularMod.state.search, popularMod.state.query);
    ResultView.sliderEventHandler();
  } catch (err) {
    // console.log(err);
    resultView.renderError(query);
  }
}

//initialize page

async function init() {
  await loadPopular();
  await onLoadHashTrailer();
  TrailerView.eventHandler(loadTrailer);
  SearchView.eventHandler(loadSearch);
}

init();
// async function getTrailer(id) {
//   try {
//     // prettier-ignore
//     let res = await fetch(`${APIURL}/movie/${id}?api_key=${APIKEY}&append_to_response=videos`);
//     if (!res.ok) {
//       res = await fetch(
//         `${APIURL}/tv/${id}?api_key=${APIKEY}&append_to_response=videos`
//       );
//     }
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     alert('this');
//   }
// }

// function displayTrailer(data) {
// title, videos > results
//prettier-ignore
//   console.log(data)
//   const {
//     title,
//     videos: { results },
//   } = data;

//   if (results.length === 0) {
//     banner.innerHTML = '';
//     const noDataMarkup = `
//       <div class="no-data">
//         <h3>Video not Available</h3>
//       </div>
//     `;
//     banner.insertAdjacentHTML('afterbegin', noDataMarkup);
//     return;
//   }
//   const official = results.find(e => {
//     return e.name === 'Official Trailer';
//   });
//   const { key } = !official ? results[0] : official;

//   banner.innerHTML = '';
//   const markup = `
//   <div class="trailer">
//     <iframe src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//   </div>
//   <div class="banner-content">
//     <h2 class="banner-title">${title}</h2>
//   </div>`;
//   banner.insertAdjacentHTML('afterbegin', markup);
// }

/*
<iframe width="560" height="315" src="https://www.youtube.com/embed/U7itlR6qESM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

*/
