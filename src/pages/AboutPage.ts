import { BaseComponent } from '../lib/BaseComponent';
import { customElement, html } from '../lib/utils';

@customElement('about-page')
export class AboutPage extends BaseComponent {
  pageTitle = 'About Page';

  render() {
    return html`
      <div class="container">
        <h1 class="text-2xl font-bold">About Page</h1>
        <p class="mt-4">This is the about page. It's a simple page that doesn't do much.</p>
      </div>
    `;
  }
}
