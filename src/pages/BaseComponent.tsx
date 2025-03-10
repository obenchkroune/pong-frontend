import { State } from "@/lib/State";

export class BaseComponent<StateT extends object = {}> {
  private _title?: string;
  private _container;
  private _store;
  private _unsubscribe;
  public state;
  public setState;

  constructor() {
    this.getHtml = this.getHtml.bind(this);
    this._container = document.createElement("div");
    this._store = new State<StateT>({} as StateT);
    this._unsubscribe = this._store.subscribe(this.getHtml);
    this.state = this._store.getState();
    this.setState = this._store.setState;
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

  getHtml() {
    this.state = this._store.getState();
    document.title = this.title;
    this._container.replaceChildren(this.render());
    return this._container;
  }

  cleanup = () => {
    this._unsubscribe();
  };
}
