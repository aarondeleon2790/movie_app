import View from './view';

class PaginationView extends View {
  containerEl = document.querySelector('.page-lists');
  currentPage;

  render(data, currentPage) {
    this.data = data;
    this.currentPage = currentPage;
    this.checkStartBtn();
    const markup = this.generateMarkup(currentPage);
    this.clearContainer();
    this.containerEl.insertAdjacentHTML('afterbegin', markup);
    this.containerEl.scrollIntoView();
  }

  checkStartBtn() {
    //prettier-ignore
    const pageStart = this.containerEl.closest('.pagination').querySelector('.page-start');
    //prettier-ignore
    const pageEnd = this.containerEl.closest('.pagination').querySelector('.page-end');
    const halfOfDisplay = Math.ceil(this.data.length + 1) / 2;
    pageStart.classList.remove('disabled');
    if (this.currentPage <= halfOfDisplay) {
      pageStart.classList.add('disabled');
    }
  }

  checkEndBtn() {}

  generateMarkup() {
    return this.data
      .map(page => {
        return `<li class="page-list"><button class="page-list-btn ${
          this.currentPage === page ? 'btn-active' : ''
        }">${page}</button></li>`;
      })
      .join('');
  }

  eventHandler(callback) {
    this.containerEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.page-list-btn');
      if (!btn) return;
      const page = e.target.innerHTML;
      callback(page);
    });
  }
}

export default new PaginationView();
