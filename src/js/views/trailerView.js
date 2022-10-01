class TrailerView {
  #containerEl = document.querySelector('.banner');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#containerEl.innerHTML = '';
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup() {
    if (!this.#data.key.key) {
      return `
        <div class="no-data">
          <h3>Video not available</h3>
        </div>
        <div class="banner-content">
          <h2 class="banner-title">${this.#data.title}</h2>
        </div>`;
    }
    return `
    <div class="banner-content">
      <h2 class="banner-title">${this.#data.title}</h2>
    </div>
    <div class="trailer">
     <iframe src="https://www.youtube.com/embed/${
       this.#data.key.key
     }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `;
    //   <div class="banner-content">
    //   <h2 class="banner-title">${this.#data.title}</h2>
    //  </div>
  }

  // eventHandler(callback) {
  //   this.#eventContainer.addEventListener('click', e => {
  //     const id = e.target.getAttribute('id');
  //     const media = e.target.getAttribute('data-media');
  //     callback(id, media);
  //   });
  // }
  eventHandler(callback) {
    window.addEventListener('hashchange', callback);
  }
}
export default new TrailerView();
