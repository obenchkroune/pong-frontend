import { BaseComponent } from '../components/BaseComponent';
import { customElement, html } from '../lib/utils';

@customElement('not-found')
export class NotFound extends BaseComponent {
  pageTitle = '404 - page not found';

  constructor() {
    super();
  }

  render(): string {
    return html`
      <div class="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 class="text-4xl font-bold tracking-tight">404 Not Found</h1>
        <p class="text-muted-foreground text-center">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Go back home
        </a>
      </div>
    `;
  }
}
