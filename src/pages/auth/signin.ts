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

  getAuthState = async () => {
    const res = await fetch("https://server.transcendence.fr/OAuth/state"); // TODO: create a proxy using vite
    if (!res.ok) throw Error("Unexpected error occured!");

    return res.text();
  };

  handleSignin = async () => {
    try {
      const state = await this.getAuthState();

      const params = {
        state,
        client_id:
          "752517493811-3uehg85g0ienmif5frk1c0lpiq15rkqm.apps.googleusercontent.com",
        redirect_uri: "https://server.transcendence.fr/OAuth/code",
        scope:
          "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        include_granted_scopes: "true",
        response_type: "code",
        access_type: "offline",
      };

      const queryString = new URLSearchParams(params).toString();

      const url = `https://accounts.google.com/o/oauth2/v2/auth?${queryString}`;

      window.open(url, "_blank");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      else console.error("Unexpected Error: ", err);
    }
  };

  render() {
    this.innerHTML = /*html*/ `
      <navigation-bar></navigation-bar>
      <fieldset class="max-w-md mx-auto my-4 flex flex-col gap-4 mt-16">
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
            <div class="shrink-0 bg-border h-[1px] w-full my-4"></div>
            <button id='google-auth-btn' class='btn w-full' type="button">
              ${GoogleIcon}
              <span>Sign-in with Google</span>
            </button>
          </div>
        </fieldset>
    `;
  }

  setup() {
    const signinForm = this.querySelector("form");
    const googleAuthBtn = this.querySelector("#google-auth-btn") as
      | HTMLButtonElement
      | undefined;
    const userInput = this.querySelector("#user-name") as
      | HTMLInputElement
      | undefined;

    signinForm?.addEventListener("submit", this.handleSumbit);
    googleAuthBtn?.addEventListener("click", this.handleSignin);
    userInput?.focus();
  }

  connectedCallback() {
    this.render();
    this.setup();
  }
}

customElements.define("signin-page", SigninPage);
