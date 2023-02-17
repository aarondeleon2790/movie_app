class SearchView {
  #containerEl = document.querySelector('.search-form');

  getQuery() {
    const query = this.#containerEl.querySelector('.search-bar-input').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#containerEl.querySelector('.search-bar-input').value = '';
  }

  eventHandler(callback) {
    this.#containerEl.addEventListener('submit', e => {
      e.preventDefault();
      callback();
      this.#clearInput();
    });
  }
}

export default new SearchView();
