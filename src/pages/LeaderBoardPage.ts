import { BaseComponent } from '../lib/BaseComponent';
import { customElement, html } from '../lib/utils';

@customElement('leaderboard-page')
export class LeaderBoardPage extends BaseComponent {
  pageTitle = 'Leaderboard';

  constructor() {
    super();
  }

  render() {
    return html`
      <navigation-bar></navigation-bar>
      <div class="container">
        <h1 class="text-2xl font-bold">Leaderboard Page</h1>
        <p class="mt-4">This is the leaderboard page. It's a simple page that doesn't do much.</p>
      </div>
    `;
  }
}
