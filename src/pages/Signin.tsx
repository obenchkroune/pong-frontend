import Navbar from "@/components/Navbar";
import { BaseComponent } from "./BaseComponent";

export default class extends BaseComponent {
  constructor() {
    super();
  }

  render(): DocumentFragment {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1>Sign-in Page</h1>
        </div>
      </div>
    );
  }
}
