import { customElement, html } from '../lib/utils';
import { BaseComponent } from './BaseComponent';

@customElement('navigation-bar')
export class NavBar extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return html`
      <div class="border-b mb-6">
        <div class="flex gap-6 container py-6">
          <h3 class="font-bold select-none">ft_transcendance</h3>
          <div
            class="flex gap-4 text-sm [&>a]:transition-colors [&>a]:text-muted-foreground [&>a]:hover:text-foreground"
          >
            <a href="/">Home</a>
            <a href="/leaderboard">Leaderboard</a>
          </div>
        </div>
      </div>
    `;
  }
}
