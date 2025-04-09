type Route = {
  pathname: string;
  component: string;
  protected?: boolean;
  title?: string;
};

const routes: Route[] = [
  {
    pathname: "/",
    component: "home-page",
  },
  {
    pathname: "/signin",
    component: "signin-page",
    title: "Sign-in",
  },
  {
    pathname: "/profile",
    component: "profile-page",
    title: "Profile",
    protected: true,
  },
  {
    pathname: "/leaderboard",
    component: "leaderboard-page",
    title: "LeaderBoard",
  },
  {
    pathname: "/play",
    component: "play-page",
    title: "Play",
  },
  {
    pathname: "*",
    component: "not-found",
    title: "404 - Not Found",
  },
];

class AppRouter extends HTMLElement {
  constructor() {
    super();
  }

  normalizePath = (path: string) => {
    let normalized = path.replace(/\/{2,}/g, "/");

    if (normalized.length > 1 && normalized.endsWith("/")) {
      normalized = normalized.slice(0, -1);
    }

    return normalized;
  };

  navigate = (pathname: string) => {
    if (pathname !== this.normalizePath(window.location.pathname)) {
      window.history.pushState({ pathname }, "", pathname);
    }
    this.renderPage();
  };

  renderPage = () => {
    const route = this.normalizePath(window.location.pathname);
    const match = routes.find((r) => {
      if (r.pathname === "*") return true;
      return r.pathname === route;
    });

    if (match) {
      if (match.protected) {
        // TODO: hit the informations api route and check if the user is authenticated otherwise redirect to /signin
        this.navigate("/signin");
        return;
      }

      document.title = match.title ?? "ft_transcendence";
      const element = document.createElement(match.component);
      this.replaceChildren(element);
    }
  };

  onLinkClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    const anchor = target.closest("a");
    if (!anchor) return;

    if (
      anchor.target === "_blank" ||
      anchor.hasAttribute("download") ||
      anchor.getAttribute("rel") === "external" ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const href = anchor.href;
    const origin = window.location.origin;

    if (href.startsWith(origin)) {
      event.preventDefault();

      this.navigate(href.replace(origin, ""));
    }
  };

  connectedCallback() {
    this.addEventListener("click", this.onLinkClick);
    window.addEventListener("popstate", this.renderPage);
    this.navigate(window.location.pathname);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.renderPage);
  }
}

customElements.define("app-router", AppRouter);
