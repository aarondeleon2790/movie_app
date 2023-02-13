import '../../node_modules/normalize.css';
import '../../node_modules/swiper/swiper-bundle.min.css';
import '../css/style.css';
import * as popularMod from './models/popularMod.js';
import * as trailerMod from './models/trailerMod.js';
import * as searchMod from './models/searchMod.js';
import popularView from './views/popularView.js';
import trailerView from './views/trailerView';
import overView from './views/overView';
import searchView from './views/searchView';
import resultView from './views/resultView';

const movList = document.querySelector('.mov-list-container');
const movImg = document.querySelector('.mov-img');
const banner = document.querySelector('.banner');
// if (module.hot) {
//   module.hot.accept();
// }

//radio buttons
const radio = document.querySelector('.radio-container');

radio.addEventListener('click', function (e) {
  if (e.target.name) {
    console.log(e.target.value);
  }
});

//onload of page
const loadPopular = async function loadPopular() {
  try {
    popularView.renderSpinner();
    await popularMod.getPopular();
    popularView.render(popularMod.state.popular);
  } catch (err) {
    // console.log(err);
    popularView.renderError(err);
  }
};

const loadTrailer = async function () {
  try {
    const id = window.location.hash.slice(1);
    await trailerMod.getTrailer(id);
    trailerView.render(trailerMod.state.trailer);
    overView.render(trailerMod.state.trailer);
  } catch (err) {
    trailerView.renderError(err);
  }
};

const loadSearch = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    //render spinner code goes here
    await searchMod.searchQuery(query);
    resultView.render(searchMod.state.searchResults, query);
  } catch (err) {
    resultView.renderError(err.message);
  }
};

//initialize page
async function init() {
  await loadPopular();
  loadTrailer();
  trailerView.eventHandler(loadTrailer);
  searchView.eventHandler(loadSearch);
}

init();
