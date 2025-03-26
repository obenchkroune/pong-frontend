import { BaseComponent } from '../lib/BaseComponent';
import { customElement, html } from '../lib/utils';

@customElement('home-page')
export default class HomePage extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    return html`
      <navigation-bar></navigation-bar>
      <todo-app></todo-app>
    `;
  }
}
