import View from './view';

class PaginationView extends View {
  containerEl = document.querySelector('.page-lists');
  currentPage;
  totalPages;
  halfOfDisplayedPage;
  maxDisplayedPage;
  currentPreviewPage;

  render(data, totalPages, currentPage) {
    this.data = data;
    this.totalPages = totalPages;
    this.currentPage = +currentPage;
    this.currentPreviewPage = +currentPage;
    this.helperCalcHalf();
    this.helperMaxDisplayed();
    this.clearContainer();
    const markup = this.generateFullMarkup();
    this.containerEl.insertAdjacentHTML('afterbegin', markup);
    this.containerEl.scrollIntoView();
  }

  generateFullMarkup() {
    return ` ${this.generateStartBtn()}
            ${this.generateMarkup()}
            ${this.generateEndBtn()}`;
  }

  generateStartBtn() {
    if (this.currentPage >= this.halfOfDisplayedPage) {
      return `<li class="page-list">
                <button class="page-list-btn page-navigate" data-page-number="${
                  -this.currentPreviewPage + 1
                }"><<</button>
              </li>`;
    }
    return '';
  }

  generateEndBtn() {
    if (this.currentPage + this.halfOfDisplayedPage < this.totalPages) {
      return `
              <li class="page-list">
                <button class="page-list-btn page-navigate" data-page-number="${this.maxDisplayedPage}">></button>
              </li>
              <li class="page-list"><button class="page-list-btn page-navigate" data-page-number="${this.totalPages}">>></button></li>
              `;
    }
    return '';
  }

  generateMarkup() {
    return this.data
      .map(page => {
        return `<li class="page-list"><button class="page-list-btn ${
          this.currentPage === page ? 'btn-active' : ''
        }" data-page-number="${page}">${page}</button>
     </li>`;
      })
      .join('');
  }

  helperCalcHalf() {
    this.halfOfDisplayedPage = Math.ceil(this.data.length + 1) / 2;
  }

  helperMaxDisplayed() {
    this.maxDisplayedPage = this.data.length;
  }

  eventHandler(loadpage, previewPage) {
    this.containerEl.addEventListener('click', e => {
      const btn = e.target.closest('.page-list-btn');
      if (!btn) return;
      const page = e.target.dataset.pageNumber;
      if (e.target.classList.contains('page-navigate')) {
        const prevNumber = Number(e.target.dataset.pageNumber);
        let previewTo = this.currentPreviewPage + prevNumber;
        console.log(previewTo);
        previewPage(previewTo);
        this.currentPreviewPage = previewTo;
      } else loadpage(page);
    });
  }
}

export default new PaginationView();
