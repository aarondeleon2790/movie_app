class PaginationView {
  containerEl = document.querySelector('.page-lists');

  render(data) {
    this.data = data;
    const markup = this.generateMarkup();
    console.log(markup);
    this.containerEl.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup() {
    return this.data
      .map(page => {
        return `<li class="page-list"><button class="page-list-btn">${page}</button></li>`;
      })
      .join('');
  }

  eventHandler(callback) {
    this.containerEl.addEventListener('click', function (e) {
      const btn = e.target.classList.contains('page-list-btn');
      if (!btn) return;
      const page = e.target.innerHTML;
      callback(page);
    });
  }
}

export default new PaginationView();
