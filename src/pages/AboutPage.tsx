import { BaseComponent } from "./BaseComponent";

class HomePage extends BaseComponent {
  constructor() {
    super();
  }

  render(): HTMLElement {
    return (
      <div class="container mx-auto p-4">
        <a href="/">Home Page</a>
        <h1>About Page</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque,
          enim! Minus nobis dolor fugiat accusantium? Impedit ab fuga enim
          quaerat, perspiciatis repellat natus dolor sit itaque explicabo quas
          dignissimos soluta?
        </p>
      </div>
    );
  }
}

export default HomePage;
