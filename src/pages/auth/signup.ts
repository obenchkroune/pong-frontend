import LockIcon from "~/icons/lock.svg?raw";
import { navigateTo } from "~/components/app-router";
import { getUser } from "../api/user";

class SignupPage extends HTMLElement {
  constructor() {
    super();
  }

  handleSumbit = async (e: SubmitEvent) => {
    const form = (e.target as HTMLElement).closest("form");

    if (form) {
      e.preventDefault();
      const fieldset = form.closest("fieldset");
      const formData = new FormData(form);

      if (
        formData.get("password")?.toString() !==
        formData.get("password_confirmation")?.toString()
      ) {
        alert("Password/Password Confirmation doesnt match");
        return;
      }
      formData.delete("password_confirmation");

      if (fieldset) fieldset.disabled = true;

      const res = await fetch("/api/user/signup", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        alert(await res.text());
        if (fieldset) fieldset.disabled = false;
        return;
      }
      const data = await res.json();

      localStorage.setItem("uid", data.token as string);
      window._currentUser = await getUser();
      navigateTo("/profile");
    }
  };

  getAuthState = async () => {
    const res = await fetch("/api/OAuth/state");
    if (!res.ok) throw Error("Unexpected error occured!");

    return res.text();
  };

  async render() {
    if (window._currentUser) {
      return navigateTo("/profile");
    }
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
                  required
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
                  required
                />
              </div>
              <div>
                <label for="user-password-confirmation">password confirmation</label>
                <input
                  name="password_confirmation"
                  class='input'
                  type="password"
                  id="user-password-confirmation"
                  placeholder="••••••••••••••••"
                  required
                />
              </div>
              <button class='btn w-full' type="submit">
                ${LockIcon}
                <span>Signup</span>
              </button>
            </form>
          </div>
        </fieldset>
    `;
    this.setup();
  }

  setup() {
    const signinForm = this.querySelector("form");
    const userInput = this.querySelector("#user-name") as
      | HTMLInputElement
      | undefined;

    signinForm?.addEventListener("submit", this.handleSumbit);
    userInput?.focus();
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("signup-page", SignupPage);
