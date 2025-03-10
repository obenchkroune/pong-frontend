import { BaseComponent } from "./BaseComponent";
import UserLayout from "@/components/layouts/UserLayout";

export default class extends BaseComponent {
  constructor() {
    super();
  }

  render(): DocumentFragment {
    return (
      <UserLayout>
        <h1>Profile Page</h1>
      </UserLayout>
    );
  }
}
