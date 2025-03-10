import Button from "@/components/Button";
import { BaseComponent } from "./BaseComponent";

class HomePage extends BaseComponent {
  constructor() {
    super();

    this.title = "About Page";
  }

  render(): HTMLElement {
    return (
      <div class="container mx-auto p-4 space-y-8">
        <Button variant="outline" href="/">
          Home Page
        </Button>
        <h1 className="text-3xl">About Page</h1>
        <p className="leading-relaxed">
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
