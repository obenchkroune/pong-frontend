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

        <div className="space-y-4">
          <p>You are Using the {this.state.getState().theme} Theme!</p>
          <Button
            onclick={() =>
              this.state.setState({
                theme:
                  this.state.getState().theme === "dark" ? "light" : "dark",
              })
            }
          >
            Change Theme!
          </Button>
        </div>
        <h1 className="text-4xl font-bold mb-4">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Increment
        </Button>
      </div>
    );
  }
}

export default HomePage;
