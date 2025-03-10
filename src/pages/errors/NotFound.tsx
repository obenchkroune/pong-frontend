import Button from "@/components/Button";
import { BaseComponent } from "../BaseComponent";

class NotFound extends BaseComponent {
  constructor() {
    super();
    this.title = "404 Not Found";
  }

  render(): DocumentFragment {
    return (
      <div className="h-screen w-screen flex flex-col gap-8 justify-center items-center">
        <h1 className="text-8xl">404: Not Found</h1>
        <p className="text-2xl">
          The page you are looking for does not exist. Please check the URL and
          try again.
        </p>
        <Button href="/">Go Back Home</Button>
      </div>
    );
  }
}
export default NotFound;
