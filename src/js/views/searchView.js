class SearchView {
  #containerEl = document.querySelector('.search-form');
  #searchEl = document.querySelector('.search-bar-input');
  #data;

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
      this.#searchEl.value = '';
    });
  }
}

export default new SearchView();
