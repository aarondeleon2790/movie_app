class SearchView {
  #containerEl;
  #eventEl = document.querySelector('.search-form');
  #searchEl = document.querySelector('.search-bar-input');
  #data;

  eventHandler(callback) {
    this.#eventEl.addEventListener('submit', e => {
      e.preventDefault();
      const query = this.#searchEl.value;
      callback(query);
      this.#searchEl.value = '';
    });
  }
}

export default new SearchView();
