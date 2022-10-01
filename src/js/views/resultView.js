import { IMGURL } from '../config';
class ResultView {
  #containerEl = document.querySelector('.carousel-container');
  #data;
  #query;

  render(data, query) {
    this.#data = data;
    this.#query = query.pop();
    const resultLabel = document.querySelector('.result-label');
    const markup = this.#generateMarkup();
    this.#containerEl.innerHTML = '';
    if (resultLabel) resultLabel.remove();
    this.#containerEl.insertAdjacentHTML('beforebegin', this.#labelMarkup());
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
    document.querySelector('.hidden').classList.remove('hidden');
  }

  #generateMarkup() {
    return this.#data
      .map(v => {
        return `
        <div class="carousel-img">
          <a href="#${v.id}" class="result-link">
            <img class="result-img" src="${
              IMGURL + v.poster
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
    <div class="result-label"><p>Search Results for : ${queryUpper}</p></div>
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
