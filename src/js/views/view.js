export default class View {
  data;
  render(data) {
    this.data = data;
    const markup = this.generateMarkup();
    this.clearContainer();
    this.containerEl.insertAdjacentHTML('afterbegin', markup);
    this.containerEl.scrollIntoView();
  }

  //fix spinner /needs animation for spinner
  renderSpinner() {
    const markup = `<div><p>loading</p></div>`;
    this.clearContainer();
    this.containerEl.insertAdjacentHTML('afterbegin', markup);
  }

  clearContainer() {
    this.containerEl.innerHTML = '';
  }

  renderError(err) {
    const markup = this.generateError(err);
    this.clearContainer();
    this.containerEl.insertAdjacentHTML('afterbegin', markup);
  }
}
