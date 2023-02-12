import { IMGURL } from '../config.js';
import View from './view';
class OverView extends View {
  containerEl = document.querySelector('.feat-mov');
  #titleDefault = 'Title not available';

  generateMarkup() {
    const title = this.data.title || this.data.name || this.#titleDefault;
    const img = this.data.backdrop || this.data.img;
    return `
    <div class="feat-mov-img">
      <img src="${IMGURL}${img}" alt="${title}">
    </div>
    <div class="feat-mov-desc">
      <h3>${title}</h3>
      <p>${this.data.overview}</p>
    </div>
    `;
  }
}

export default new OverView();
