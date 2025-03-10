import { State } from "@/lib/State";

export class BaseComponent<StateT = any> {
  private _container: HTMLDivElement;
  private _title?: string;
  private _unsubscribe?: () => void;
  state: State<StateT>;

  constructor() {
    this.state = new State<StateT>({} as StateT);
    this._container = document.createElement("div");
    this.getHTMLElements = this.getHTMLElements.bind(this);
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

  cleanup() {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = undefined;
    }
  }

  getHTMLElements() {
    this.cleanup();
    document.title = this.title;
    this._container.replaceChildren(router.mount(this.render()));
    this._unsubscribe = this.state.subscribe(this.getHTMLElements);
    return this._container;
  }
}
