import "./style.css";
import { Router } from "./lib/Router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/errors/NotFound";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  globalThis.router = new Router(app);

  router.addErrorRoute(404, NotFound);

  router.addRoute("/", HomePage);
  router.addRoute("/about", AboutPage);

  router.init();

  document.addEventListener("click", (e) => {
    if (
      e.target instanceof HTMLAnchorElement &&
      e.target.href.startsWith(window.location.origin)
    ) {
      e.preventDefault();
      window.router.navigateTo(new URL(e.target.href).pathname);
    }
  });
});
