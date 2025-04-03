import { customElement, html, onEvent, onWin } from '../lib/utils';
import { BaseComponent } from '../lib/BaseComponent';

const pageModules = import.meta.glob('../pages/**/*.ts', { eager: true });

const routes = new Map<string, string>();

for (const modulePath in pageModules) {
  let routePath = modulePath
    .replace(/^.*\/pages\//, '/')
    .replace(/\.(ts|js)$/, '');

  if (routePath.endsWith('/index')) {
    routePath = routePath.slice(0, -'/index'.length) || '/';
  }

  const moduleExports = pageModules[modulePath] as any;
  const component = moduleExports.default;
  const tag_name = component?.prototype?.__tag_name__;

  if (component && tag_name) {
    routes.set(routePath, tag_name);
  }
}

console.debug('Registered routes:', Array.from(routes.entries()));

@customElement('app-router')
export class AppRouter extends BaseComponent {
  constructor() {
    super();
    const { pathname } = window.location;
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
    if (
      e.target instanceof HTMLAnchorElement &&
      e.target.origin === window.location.origin
    ) {
      e.preventDefault();
      const pathname = e.target.pathname;
      if (pathname !== window.location.pathname) {
        window.history.pushState(
          { pathname },
          '',
          this.sanitizePathname(pathname)
        );
        this.update();
      }
    }
  }

  @onWin('popstate')
  handlePopState() {
    this.update();
  }

  getComponentTagName(pathname: string): string {
    const sanitizedPath = this.sanitizePathname(pathname);

    if (routes.has(sanitizedPath)) {
      return routes.get(sanitizedPath)!;
    }

    if (routes.has(sanitizedPath + '/index')) {
      return routes.get(sanitizedPath + '/index')!;
    }

    if (routes.has(sanitizedPath + '/')) {
      return routes.get(sanitizedPath + '/')!;
    }

    return routes.get('/404')!;
  }

  render() {
    const { pathname } = window.location;
    const currentComponent = this.getComponentTagName(pathname);
    return html`
      <div class='flex flex-col h-full'>
        <navigation-bar></navigation-bar>
        <${currentComponent} class='grow'></${currentComponent}>
      </div>
    `;
  }
}
