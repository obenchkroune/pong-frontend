import { customElement, html } from '../lib/utils';
import { BaseComponent } from '../lib/BaseComponent';

type State = {
  links: Record<string, string>;
};

@customElement('navigation-bar')
export class NavBar extends BaseComponent<State> {
  constructor() {
    super();
    this.state.links = {
      Home: '/',
      Play: '/play',
      LeaderBoard: '/leaderboard',
    };
  }

  render() {
    return html`
      <div class="border-b mb-6">
        <div class="flex items-center gap-8 container py-6">
          <h3 class="font-bold select-none">ft_transcendance</h3>
          <div
            class="flex items-center gap-6 [&>a]:transition-colors [&>a]:text-muted-foreground [&>a]:hover:text-foreground"
          >
            ${() =>
              Object.entries(this.state.links).map(
                ([label, pathname]) =>
                  html`
                    <a
                      class="${window.location.pathname === pathname && 'text-foreground!'}"
                      href="${pathname}"
                    >
                      ${label}
                    </a>
                  `
              )}
          </div>
        </div>
      </div>
    `;
  }
}
