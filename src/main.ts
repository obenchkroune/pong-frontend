import "./style.css";
import { Router } from "./lib/Router";
import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/errors/NotFound";
import LeaderBoard from "./pages/LeaderBoard";
import Play from "./pages/Play";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  globalThis.router = new Router(app);

  // error pages
  router.addErrorRoute(404, NotFound);

  // routes
  router.addRoute("/", HomePage);
  // router.addRoute("/about", AboutPage);
  router.addRoute("/leaderboard", LeaderBoard);
  router.addRoute("/play", Play);
  router.addRoute("/profile", Profile);
  router.addRoute("/sign-in", Signin);

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
