import { IMGURL } from '../config.js';
class TrailerView {
  #containerEl = document.querySelector('.banner');
  #data;

  render(data) {
    this.#data = data;
    this.#containerEl.innerHTML = '';
    this.#containerEl.insertAdjacentHTML('afterbegin', this.generateMarkup());
  }

  generateMarkup() {
    if (!this.#data.key.key) {
      return `
        <div class="no-data">
          <h3>Video not available</h3>
        </div>`;
    }
    return `
    <div class="trailer">
     <iframe src="https://www.youtube.com/embed/${
       this.#data.key.key
     }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="banner-content">
     <h2 class="banner-title">${this.#data.title}</h2>
    </div>`;
  }
}
export default new TrailerView();
