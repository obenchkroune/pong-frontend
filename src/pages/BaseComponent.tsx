import { State } from "@/lib/State";

export class BaseComponent<StateT extends object = {}> {
  private _title?: string;
  private _container;
  private _store;
  private _unsubscribe: Array<() => void> = [];
  public state;
  public setState;

  constructor() {
    this.getHtml = this.getHtml.bind(this);
    this._container = document.createDocumentFragment();
    this._store = new State<StateT>({} as StateT);
    this.state = this._store.getState();
    this.setState = this._store.setState;
  }

  get title() {
    return this._title ?? document.title;
  }

  set title(title: string) {
    this._title = title;
  }

  setRenderCallback(cb: () => any) {
    this._unsubscribe.push(this._store.subscribe(cb));
  }

  render(): DocumentFragment {
    return this._container;
  }

  getHtml() {
    this.state = this._store.getState();
    document.title = this.title;
    this._container.replaceChildren(this.render());
    return this._container;
  }

  cleanup = () => {
    for (const cb of this._unsubscribe) {
      cb();
    }
  };
}
