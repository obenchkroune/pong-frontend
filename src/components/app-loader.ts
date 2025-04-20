import LoadingIcon from "~/icons/loading.svg?raw";

class AppLoader extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = /*html*/ `
      <div class="fixed inset-0 bg-background flex items-center justify-center">
        <div class='flex flex-col gap-2'>
          ${LoadingIcon}
          <p>Loading...</p>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("app-loader", AppLoader);
