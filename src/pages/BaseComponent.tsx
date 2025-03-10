import { State } from "@/lib/State";

export class BaseComponent<StateT = any> {
  private container: HTMLDivElement;
  state: State<StateT>;

  constructor() {
    this.state = new State<StateT>({} as StateT);
    this.container = document.createElement("div");
    this.getHTMLElements = this.getHTMLElements.bind(this);
  }

  render(): HTMLElement {
    return this.container;
  }

  // Remove subscription from here, so it only updates DOM
  getHTMLElements() {
    this.container.replaceChildren(router.mount(this.render()));
    this.state.subscribe(this.getHTMLElements);
    return this.container;
  }
}
