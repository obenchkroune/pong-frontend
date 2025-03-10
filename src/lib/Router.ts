import { BaseComponent } from "@/pages/BaseComponent";

type Route = {
  path: string;
  component: typeof BaseComponent;
};

export class Router {
  private routes: Route[] = [];
  private root: HTMLElement;
  private currentComponent: BaseComponent | null = null;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;
    window.addEventListener("popstate", () => this.handleRoute());
  }

  addRoute(path: string, component: typeof BaseComponent<any>) {
    this.routes.push({ path, component });
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
      if (this.currentComponent) {
        this.currentComponent.cleanup();
      }

      this.root.innerHTML = "";
      this.currentComponent = new route.component();
      this.root.appendChild(this.currentComponent.getHtml());
    }
  }

  init() {
    this.handleRoute();
  }
}
