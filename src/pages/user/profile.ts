class ProfilePage extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    // TODO: check if user is logged in otherwise redirect to /signin
    this.innerHTML = /*html*/ `
      <navigation-bar></navigation-bar>
      <div>
        <h1>Profile Page</h1>
      </div>
    `;
  }

  setup() {
    //
  }

  connectedCallback() {
    this.render();
    this.setup();
  }
}

customElements.define("profile-page", ProfilePage);
