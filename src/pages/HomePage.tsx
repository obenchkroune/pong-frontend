import { BaseComponent } from "./BaseComponent";

interface AppState {
  counter: number;
  theme: "light" | "dark";
}

class HomePage extends BaseComponent<AppState> {
  constructor() {
    super();

    this.state.setState({
      counter: 0,
      theme: "light",
    });
  }

  render(): HTMLElement {
    return (
      <div class="container mx-auto p-4">
        <div class="text-center">
          <a href="/about">About Page</a>
          <h1 class="text-4xl font-bold mb-4">
            Counter: {this.state.getState().counter}
          </h1>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded"
            onclick={() => {
              this.state.setState({
                counter: this.state.getState().counter + 1,
              });
            }}
          >
            Increment
          </button>
        </div>
      </div>
    );
  }
}

export default HomePage;
