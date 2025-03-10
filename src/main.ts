import "./style.css";
import { Router } from "./lib/Router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const app = document.querySelector<HTMLDivElement>("#app")!;
globalThis.router = new Router(app);

router.addRoute("/", HomePage);
router.addRoute("/about", AboutPage);

router.init();
