import { IMGURL } from '../config';
class ResultView {
  #containerEl = document.querySelector('.search-result');
  #data;

  render(data) {
    this.#data = data;
    const markup = `<div class="result-title"><p>Search Results:</p></div><div class="search-split">${this.#generateMarkup()}</div>`;
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
          <a href="#${v.id}">
          <img class="carousel-img-link" src="${
            IMGURL + v.poster
          }" alt="poster image of ${v.title}" id="${v.id}"  data-media="movie">
          <a/>
        </div>`;
      })
      .join('');
  }
}

export default new ResultView();
