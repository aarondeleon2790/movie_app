import { IMGURL } from '../config.js';

class PopularView {
  #containerEl = document.querySelector('.mov-list-container');
  #data;
  #errorMessage = 'Cannot display popular movies';
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#containerEl.innerHTML = '';
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(err) {
    const markup = this.#generateError(err);
    this.#containerEl.innerHTML = '';
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
  }

  #generateError(err) {
    //prettier-ignore
    return `<div class="errorMessage"><p>${this.#errorMessage}</p><p>${err}</p></div>`;
  }

  #generateMarkup() {
    return this.#data
      .map(mov => {
        const title = mov.title ?? mov.name;
        //prettier-ignore
        const releaseDate = mov.releaseDate ?? new Date().getFullYear();
        return ` <div class="mov-list-card">
        <div class="mov-img-container">
          <a href="#${mov.id}">
          <img class="mov-img" src="${
            IMGURL + mov.poster
          }" alt="poster image of ${title}" data-media="movie">
          <a/>
        </div>
        <div class="mov-list-description">
          <h3>${title}</h3>
          <p>Genre / ${releaseDate}</p>
        </div>
        </div>`;
      })
      .join('');
  }
}

export default new PopularView();
