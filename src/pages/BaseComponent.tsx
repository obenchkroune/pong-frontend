import { State } from "@/lib/State";

export class BaseComponent<StateT = any> {
  private _container: HTMLDivElement;
  private _title?: string;
  state: State<StateT>;

  constructor() {
    this._container = document.createElement("div");
    this.getHTMLElements = this.getHTMLElements.bind(this);
    this.state = new State<StateT>({} as StateT);
    this.state.subscribe(this.getHTMLElements);
  }

  get title() {
    return this._title ?? document.title;
  }

  set title(title: string) {
    this._title = title;
  }

  render(): HTMLElement {
    return this._container;
  }

  getHTMLElements() {
    if (this._title) {
      document.title = this.title;
    }
    this._container.replaceChildren(router.mount(this.render()));
    return this._container;
  }
}
