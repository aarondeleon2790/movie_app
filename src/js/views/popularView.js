import { IMGURL } from '../config.js';

class popularView {
  #containerEl = document.querySelector('.mov-list-container');
  #data;
  render(data) {
    this.#data = data;
    const markup = this.generateMarkup();
    this.#containerEl.innerHTML = '';
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup() {
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
          }" alt="poster image of ${title}">
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

export default new popularView();
