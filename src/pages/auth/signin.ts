import GoogleIcon from "~/icons/google.svg?raw";
import LockIcon from "~/icons/lock.svg?raw";

class SigninPage extends HTMLElement {
  constructor() {
    super();
  }

  handleSumbit = (e: SubmitEvent) => {
    const form = (e.target as HTMLElement).closest("form");

    if (form) {
      e.preventDefault();
      const formData = new FormData(form);

      console.log(formData);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
    }
  };

  render() {
    this.innerHTML = /*html*/ `
      <navigation-bar></navigation-bar>
      <fieldset class="max-w-md mx-auto my-4 flex flex-col gap-4">
          <a href="/" class="text-xl link">ft_transcendence</a>
          <div class="p-6 md:rounded-md border">
            <form class="space-y-6 [&_label]:block [&_label]:mb-4">
              <div>
                <label for="user-name">username</label>
                <input
                  class='input'
                  type="text"
                  id="user-name"
                  name="username"
                  placeholder="msitni"
                  autocomplete="off"
                />
              </div>
              <div>
                <label for="user-password">password</label>
                <input
                  class='input'
                  type="password"
                  id="user-password"
                  name="password"
                  placeholder="••••••••••••••••"
                />
              </div>
              <button class='btn w-full' type="submit">
                ${LockIcon}
                <span>Submit</span>
              </button>
            </form>
            <div
              data-orientation="horizontal"
              role="none"
              class="shrink-0 bg-border h-[1px] w-full my-4"
            ></div>
            <button class='btn w-full' type="button">
              ${GoogleIcon}
              <span>Sign-in with Google</span>
            </button>
          </div>
        </fieldset>
    `;
  }

  setup() {
    this.querySelector("form")?.addEventListener("submit", this.handleSumbit);
    const userInput = this.querySelector("#user-name") as HTMLInputElement;
    userInput.focus();
  }

  connectedCallback() {
    this.render();
    this.setup();
  }
}

customElements.define("signin-page", SigninPage);
