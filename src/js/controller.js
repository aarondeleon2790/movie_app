import '../../node_modules/normalize.css';
import '../../node_modules/swiper/swiper-bundle.min.css';
import '../css/style.css';
import { MAXPAGINATIONDISPLAY } from './config';
import * as popularMod from './models/popularMod.js';
import * as trailerMod from './models/trailerMod.js';
import * as searchMod from './models/searchMod.js';
import popularView from './views/popularView.js';
import trailerView from './views/trailerView';
import overView from './views/overView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';

const movList = document.querySelector('.mov-list-container');
const movImg = document.querySelector('.mov-img');
const banner = document.querySelector('.banner');

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
    await popularMod.loadPopular();
    popularView.render(popularMod.state.currentGroup);
  } catch (err) {
    popularView.renderError(err);
  }
};

const loadTrailer = async function () {
  try {
    await trailerMod.getTrailer();
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

const loadPagination = function (currentPage = 1) {
  // popularMod.state.totalPages;
  const page = Number(currentPage);
  // prettier-ignore
  const pageData = generatePagination(popularMod.state.totalPages, MAXPAGINATIONDISPLAY, page);
  paginationView.render(pageData, popularMod.state.totalPages, currentPage);
};

const generatePagination = function (totalPage, maxDisplay, currentPage) {
  const half = Math.ceil(maxDisplay / 2);
  let start = currentPage - half;
  if (currentPage + half >= totalPage) {
    start = totalPage - maxDisplay;
  }
  if (start <= 0) {
    start = 0;
  }
  return Array.from({ length: maxDisplay }, (_, index) => index + 1 + start);
};

const loadPage = async function (page) {
  popularView.renderSpinner();
  await popularMod.getPageResult(page);
  popularView.render(popularMod.state.currentGroup);
  loadPagination(page);
};

//initialize page
async function init() {
  await loadPopular();
  loadPagination();
  await loadTrailer();
  trailerView.eventHandler(loadTrailer);
  searchView.eventHandler(loadSearch);
  paginationView.eventHandler(loadPage);
}

init();
