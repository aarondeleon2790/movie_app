import { IMGURL } from '../config';
class ResultView {
  #containerEl = document.querySelector('.search-result');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#containerEl.innerHTML = '';
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
    this.#containerEl.classList.remove('hidden');
    this.#data = '';
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
}

export default new ResultView();
