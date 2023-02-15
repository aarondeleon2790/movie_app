import View from './view.js';
class TrailerView extends View {
  containerEl = document.querySelector('.banner');
  #errorMessage = 'Cannot load trailer.';

  generateError(err) {
    //prettier-ignore
    return `<div class="errorMessage"><p>${this.#errorMessage }</p></div>`;
  }

  generateMarkup() {
    if (!this.data.key) {
      return `
        <div class="no-data">
          <h3>Video not available</h3>
        </div>
        <div class="banner-content">
          <h2 class="banner-title">${this.data.title}</h2>
        </div>`;
    }
    return `
    <div class="banner-content">
      <h2 class="banner-title">${this.data.title}</h2>
    </div>
    <div class="trailer">
     <iframe src="https://www.youtube.com/embed/${this.data.key.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `;
  }

  eventHandler(callback) {
    window.addEventListener('hashchange', callback);
  }
}
export default new TrailerView();
