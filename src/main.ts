import { getUser } from "./pages/api/user";
import "./style.css";
import.meta.glob("./components/**/*.ts", { eager: true });
import.meta.glob("./pages/**/*.ts", { eager: true });

(async () => {
  window._currentUser = await getUser();
  const root = document.querySelector("#app");
  if (!root) throw Error("App Root Not Found!");

  root.innerHTML = `<app-router></app-router>`;
})();
