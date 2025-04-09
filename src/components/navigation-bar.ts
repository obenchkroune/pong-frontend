import LockIcon from "~/icons/lock.svg?raw";
import MenuIcon from "~/icons/menu.svg?raw";
import XIcon from "~/icons/x.svg?raw";

class NavigationBar extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = /*html*/ `
      <div class='px-2 py-2 border-b mb-8'>
        <div class='container flex items-center'>
          <button id='open-menu-btn' class='me-4 md:hidden cursor-pointer'>
            ${MenuIcon}
            <span class='sr-only'>menu</span>
          </button>
          <h4 class='font-bold text-lg me-8 select-none'>ft_transcendence</h4>
          <div class='hidden md:flex gap-2 [&>a]:text-muted-foreground [&>a]:hover:text-foreground transition-colors [&>a]:p-2 [&>a]:py-3'>
            <a href="/">Home</a>
            <a href="/play">Play</a>
            <a href="/leaderboard">LeaderBoard</a>
          </div>
          <div class='ms-auto'>
            <a class='btn' href="/signin">
              ${LockIcon}
              <span>Signin</span>
            </a>
          </div>
        </div>
      </div>
      <div class='hidden md:hidden absolute inset-0 bg-background/80 backdrop-blur-md p-4' id='mobile-menu'>
        <div class='border-b flex items-center justify-between pb-4 mb-4'>
          <h4 class='font-bold text-lg me-8 select-none'>ft_transcendence</h4>
          <button class='cursor-pointer' id='close-menu-btn'>${XIcon}</button>
        </div>
        <div class='flex flex-col gap-2'>
          <a class='focus:bg-muted py-2 px-4 -mx-4 transition-colors' href="/">Home</a>
          <a class='focus:bg-muted py-2 px-4 -mx-4 transition-colors' href="/play">Play</a>
          <a class='focus:bg-muted py-2 px-4 -mx-4 transition-colors' href="/leaderboard">LeaderBoard</a>
        </div>
      </div>
    `;
  }

  setup() {
    const closeMenuBtn = this.querySelector(
      "#close-menu-btn"
    ) as HTMLButtonElement;
    const openMenuBtn = this.querySelector(
      "#open-menu-btn"
    ) as HTMLButtonElement;
    const mobileMenuElement = this.querySelector(
      "#mobile-menu"
    ) as HTMLDivElement;

    closeMenuBtn.addEventListener("click", () => {
      mobileMenuElement.classList.add("hidden");
    });

    openMenuBtn.addEventListener("click", () => {
      mobileMenuElement.classList.remove("hidden");
    });
  }

  connectedCallback() {
    this.render();
    this.setup();
  }
}

customElements.define("navigation-bar", NavigationBar);
