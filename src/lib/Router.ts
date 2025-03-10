import { BaseComponent } from "@/pages/BaseComponent";

type Route = {
  path: string;
  component: BaseComponent;
};

export class Router {
  private routes: Route[] = [];
  private root: HTMLElement;
  private currentComponent: HTMLElement | null = null;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;
    window.addEventListener("popstate", () => this.handleRoute());
  }

  mount(div: HTMLElement) {
    for (const el of div.querySelectorAll("a")) {
      if (el.href.startsWith(window.location.origin)) {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          window.router.navigateTo(new URL(el.href).pathname);
        });
      }
    }
    return div;
  }

  addRoute(path: string, component: typeof BaseComponent) {
    this.routes.push({ path, component: new component() });
  }

  navigateTo(path: string) {
    window.history.pushState({ path }, "", path);
    this.handleRoute();
  }

  private handleRoute() {
    const path = window.location.pathname;
    const route =
      this.routes.find((route) => route.path === path) || this.routes[0];

    if (route) {
      if (this.currentComponent && (this.currentComponent as any).cleanup) {
        (this.currentComponent as any).cleanup();
      }

      this.root.innerHTML = "";
      this.currentComponent = route.component.getHTMLElements();
      this.root.appendChild(this.currentComponent);
    }
  }

  init() {
    this.handleRoute();
  }
}
