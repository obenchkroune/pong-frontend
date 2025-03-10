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

    this.setState({
      counter: 0,
      theme: "light",
    });
  }

  render(): DocumentFragment {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <div className="flex gap-4">
          <Button variant="outline" href="https://google.com">
            Google Page
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
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </Button>
          <Button href="/about" variant="outline">
            About Page
          </Button>
          <Button variant="outline" href="/123">
            Non Existing Page
          </Button>
        </div>

        <div className="space-y-4">
          <p>You are Using the {this.state.theme} Theme!</p>
          <Button
            onclick={() =>
              this.setState({
                theme: this.state.theme === "dark" ? "light" : "dark",
              })
            }
          >
            Change Theme!
          </Button>
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Counter: {this.state.counter}
        </h1>
        <Button
          variant="default"
          onclick={() => {
            this.setState({
              counter: this.state.counter + 1,
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
