import { customElement, html, onEvent, onWin } from '../lib/utils';
import { BaseComponent } from '../lib/BaseComponent';

interface Route {
  pathname: string;
  component: string;
}

const routes: Route[] = [
  {
    pathname: '/',
    component: 'home-page',
  },
  {
    pathname: '/about',
    component: 'about-page',
  },
  {
    pathname: '/leaderboard',
    component: 'leaderboard-page',
  },
];

@customElement('app-router')
export class AppRouter extends BaseComponent {
  constructor() {
    super();
    const pathname = window.location.pathname;
    window.history.pushState({ pathname }, '', this.sanitizePathname(pathname));
  }

  sanitizePathname(pathname: string) {
    const normalized = pathname.replace(/\/{2,}/g, '/');

    if (normalized === '/' || normalized === '') {
      return '/';
    }

    return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
  }

  @onEvent('click')
  handleLink(e: Event) {
    if (e.target instanceof HTMLAnchorElement && e.target.origin === window.location.origin) {
      e.preventDefault();
      const pathname = e.target.pathname;
      if (pathname !== window.location.pathname) {
        window.history.pushState({ pathname }, '', this.sanitizePathname(pathname));
        this.update();
      }
    }
  }

  @onWin('popstate')
  handlePopState() {
    this.update();
  }

  render() {
    const currentComponent =
      routes.find((route) => route.pathname === window.location.pathname)?.component ?? 'not-found';

    return html`
      <div class='flex flex-col h-full'>
        <navigation-bar></navigation-bar>
        <${currentComponent} class='grow'></${currentComponent}>
      </div>
    `;
  }
}
