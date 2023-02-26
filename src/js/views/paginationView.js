import View from './view';

class PaginationView extends View {
  containerEl = document.querySelector('.page-lists');
  currentPage;
  totalPages;
  halfOfDisplayedPage;
  maxDisplayedPage;

  render(data, totalPages, currentPage) {
    this.data = data;
    this.totalPages = totalPages;
    this.currentPage = +currentPage;
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
    //code for adding start of page button
    // if (this.currentPage >= this.halfOfDisplayedPage)
    if (this.currentPage > 1) {
      return `
            <li class="page-list">
                <button class="page-list-btn page-navigate" data-page-number="${
                  //this code is for adding start of page button
                  // -this.currentPage + 1
                  -this.maxDisplayedPage
                }"><<</button>
            </li>
            <li class="page-list">
                <button class="page-list-btn page-navigate" data-page-number="${
                  //code for adding start of page button
                  // -this.maxDisplayedPage
                  -1
                }"><</button>
            </li>
            `;
    }
    return '';
  }

  generateEndBtn() {
    //code for adding end of page button
    // if (this.currentPage + this.halfOfDisplayedPage < this.totalPages)
    if (this.currentPage < this.totalPages) {
      return `
              <li class="page-list">
                <button class="page-list-btn page-navigate" data-page-number="
                ${
                  // code for adding end of page button
                  // this.maxDisplayedPage
                  1
                }
                
                ">></button>
              </li>
              <li class="page-list"><button class="page-list-btn page-navigate" data-page-number="${
                // code for adding end of page button
                // this.totalPages - this.currentPage
                this.maxDisplayedPage
              }">>></button></li>
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

  generatePageNavigation(targetEl) {
    const pageNumber = Number(targetEl.dataset.pageNumber);
    if (targetEl.classList.contains('page-navigate')) {
      let prevPage = this.currentPage + pageNumber;
      if (prevPage > this.totalPages) {
        prevPage = this.totalPages;
      }
      if (prevPage < 1) {
        prevPage = 1;
      }
      return prevPage;
    } else return pageNumber;
  }

  eventHandler(loadpage) {
    this.containerEl.addEventListener('click', e => {
      const btn = e.target.closest('.page-list-btn');
      if (!btn) return;
      const pageNumber = this.generatePageNavigation(btn);
      loadpage(pageNumber);
    });
  }
}

export default new PaginationView();
