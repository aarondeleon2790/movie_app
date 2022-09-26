import { IMGURL } from '../config';
class ResultView {
  #containerEl = document.querySelector('.carousel-container');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#containerEl.innerHTML = '';
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
    this.#containerEl.classList.remove('hidden');
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
