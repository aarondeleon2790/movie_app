import { IMGURL } from '../config';
class ResultView {
  // #containerEl = document.querySelector('.carousel-container');
  #containerEl = document.querySelector('.swiper-wrapper');
  #data;
  #query;
  #errorMessage = 'No results found for : ';
  #errorContainer = document.querySelector('.search-result');

  render(data, query) {
    let _ = document.querySelector('.result-error');
    if (_) _.remove();
    this.#data = data;
    this.#query = query;
    const resultLabel = document.querySelector('.result-label');
    const markup = this.#generateMarkup();
    this.#containerEl.innerHTML = '';
    if (resultLabel) resultLabel.remove();
    this.#containerEl.insertAdjacentHTML('beforebegin', this.#labelMarkup());
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
    if (!document.querySelector('.hidden')) return;
    document.querySelector('.hidden').classList.remove('hidden');
    this.#containerEl.scrollIntoView(false);
  }

  renderError(err) {
    let _ = document.querySelector('.result-error');
    if (_) _.remove();
    const markup = this.#generateError(err);
    this.#errorContainer.classList.add('hidden');
    document.querySelector('.split').insertAdjacentHTML('afterend', markup);
  }

  #generateError(err) {
    //prettier-ignore
    return `<div class="result-error"><p>${this.#errorMessage + err }</p></div>`;
  }

  #generateMarkup() {
    return this.#data
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
  }

  #labelMarkup() {
    const queryUpper =
      String(this.#query)[0].toUpperCase() + String(this.#query).slice(1);
    return `
    <div class="result-label"><p>Search Results for :  ${queryUpper}</p></div>
    `;
  }

  sliderEventHandler() {
    let scrollAmt = 0;
    let scrollSpace = 200;
    document.querySelector('.right-slider').addEventListener('click', () => {
      this.#containerEl.scrollTo({
        top: 0,
        left: (scrollAmt += scrollSpace),
      });
      if (scrollAmt < 0) {
        scrollAmt = 0;
      }
    });
    document.querySelector('.left-slider').addEventListener('click', () => {
      this.#containerEl.scrollTo({
        top: 0,
        left: (scrollAmt -= scrollSpace),
      });
    });
  }
}

export default new ResultView();
