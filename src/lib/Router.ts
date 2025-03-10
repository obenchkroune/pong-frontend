import { BaseComponent } from "@/pages/BaseComponent";

type Route = {
  path: string;
  component: typeof BaseComponent;
};

export class Router {
  private routes: Route[] = [];
  private errorRoutes: Map<number, typeof BaseComponent>;
  private root: HTMLElement;
  private currentComponent?: BaseComponent;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;
    this.errorRoutes = new Map();
    window.addEventListener("popstate", () => this.handleRoute());
  }

  addRoute(path: string, component: typeof BaseComponent<any>) {
    this.routes.push({ path, component });
  }

  addErrorRoute(code: number, component: typeof BaseComponent<any>) {
    this.errorRoutes.set(code, component);
  }

  navigateTo(path: string) {
    window.history.pushState({ path }, "", path);
    this.handleRoute();
  }

  private handleRoute() {
    const path = window.location.pathname;
    const route = this.routes.find((route) => route.path === path);

    if (route) {
      if (this.currentComponent) {
        this.currentComponent.cleanup();
        this.currentComponent = undefined;
      }

      this.root.innerHTML = "";
      this.currentComponent = new route.component();
      this.root.replaceChildren(this.currentComponent.getHtml());
    } else if (this.errorRoutes.has(404)) {
      this.currentComponent = new (this.errorRoutes.get(404)!)();
      this.root.replaceChildren(this.currentComponent.getHtml());
    }
  }

  init() {
    this.handleRoute();
  }
}
