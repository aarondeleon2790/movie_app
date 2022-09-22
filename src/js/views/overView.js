import { IMGURL } from '../config.js';
class OverView {
  #containerEl = document.querySelector('.feat-mov');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#containerEl.innerHTML = '';
    this.#containerEl.insertAdjacentHTML('afterbegin', markup);
  }
  #generateMarkup() {
    return `
    <div class="feat-mov-img">
      <img src="${IMGURL}${
      this.#data.backdrop
    }alt="movie image with description">
    </div>
    <div class="feat-mov-desc">
      <h3>Jack Reacher 3</h3>
      <p>Inventore repellat! Voluptates aspernatur eligendi adipisci totam unde? eos in dolorum qui iusto sequi culpa. Et, cupiditate?psum dolor sit amet consectetur adipisicing elit. Fugit sequi qui reprehenderit asperiores, maxime deleniti molestias illo tempora vitae, tenetur, eaque saepe? Eveniet, officia recusandae!</p>
    </div>
    `;
  }
}

export default new OverView();
