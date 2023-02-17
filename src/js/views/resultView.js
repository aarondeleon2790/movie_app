import { IMGURL } from '../config';
import Swiper, { Navigation } from 'swiper';
import View from './view';
class ResultView extends View {
  containerEl = document.querySelector('.search-result');
  #data;
  #query;
  #errorMessage = 'No results found for : ';

  //redefine render function for this view
  render(data, query) {
    this.#data = data;
    this.#query = query;
    const markup = this.#generateMarkup();
    const labelMarkup = this.#labelMarkup();
    this.clearContainer();
    this.containerEl.insertAdjacentHTML('afterbegin', markup);
    this.containerEl.insertAdjacentHTML('afterbegin', labelMarkup);
    this.#initializeSwiper();
    this.containerEl.scrollIntoView();
  }

  renderError(err) {
    this.clearContainer();
    const markup = this.#generateError(err);
    this.containerEl.insertAdjacentHTML('afterbegin', markup);
    this.containerEl.scrollIntoView({ block: 'center' });
  }

  #generateError(err) {
    //prettier-ignore
    return `<div class="result-error"><p>${this.#errorMessage + err }</p></div>`;
  }

  #generateMarkup() {
    const data = this.#data
      .map(v => {
        return `
            <div class="swiper-slide">
              <a href="#${v.id}" class="result-link">
                <img class="result-img" src="${
                  IMGURL + v.poster || v.backdrop
                }" alt="poster image of ${v.title}" "data-media="movie">
              <a/>
            </div>`;
      })
      .join('');

    return `
            <div class="swiper">
              <div class="swiper-wrapper">
                ${data}
              </div>
             
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>`;
  }

  #labelMarkup() {
    const queryUpper =
      String(this.#query)[0].toUpperCase() + String(this.#query).slice(1);
    return `
    <div class="result-label"><p>Search Results for :  ${queryUpper}</p></div>
    `;
  }

  #initializeSwiper() {
    new Swiper('.swiper', {
      // Install modules
      modules: [Navigation],
      slidesPerView: 'auto',
      spaceBetween: 1,
      slidesPerGroup: 3,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

export default new ResultView();
