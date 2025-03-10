import Button from "@/components/Button";
import { BaseComponent } from "./BaseComponent";

interface AppState {
  counter: number;
  theme: "light" | "dark";
}

class HomePage extends BaseComponent<AppState> {
  constructor() {
    super();

    this.title = "Home Page";

    this.state.setState({
      counter: 0,
      theme: "light",
    });
  }

  render(): HTMLElement {
    return (
      <div class="container mx-auto p-4 space-y-8">
        <Button href="/about" variant="outline">
          About Page
        </Button>
        <h1 class="text-4xl font-bold mb-4">
          Counter: {this.state.getState().counter}
        </h1>
        <Button
          variant="default"
          onclick={() => {
            this.state.setState({
              counter: this.state.getState().counter + 1,
            });
          }}
        >
          Increment
        </Button>
      </div>
    );
  }
}

export default HomePage;
