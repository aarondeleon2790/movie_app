import { IMGURL } from '../config.js';
class OverView {
  #containerEl = document.querySelector('.feat-mov');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#containerEl.innerHTML = '';
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
  }
  #generateMarkup() {
    // refactor to short circuiting
    const title = this.#data.title ? this.#data.title : this.#data.name;
    return `
    <div class="feat-mov-img">
      <img src="${IMGURL}${this.#data.backdrop}" alt="${title}">
    </div>
    <div class="feat-mov-desc">
      <h3>${title}</h3>
      <p>${this.#data.overview}</p>
    </div>
    `;
  }
}

export default new OverView();
