import { navigateTo } from "~/components/app-router";

class ProfilePage extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    if (!window._currentUser) navigateTo("/signin");
    this.innerHTML = /*html*/ `
      <navigation-bar></navigation-bar>
      <pre class='container'>${JSON.stringify(
        window._currentUser,
        null,
        2
      )}</pre>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("profile-page", ProfilePage);
