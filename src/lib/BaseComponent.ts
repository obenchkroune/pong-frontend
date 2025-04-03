import {
  ComponentEventListeners,
  DOC_EVENT_METADATA_KEY,
  EVENT_METADATA_KEY,
  WIN_EVENT_METADATA_KEY,
} from './utils';

export class BaseComponent<
  TProps extends Record<string, any> = Record<string, any>
> extends HTMLElement {
  cleanup = Array<() => void>();
  pageTitle?: string;
  state: TProps;

  constructor() {
    super();
    this.state = new Proxy<TProps>({} as TProps, {
      set: (target, key, value: any) => {
        target[key as keyof TProps] = value;
        this.update();
        return true;
      },
      get: (target, key) => {
        return target[key as keyof TProps];
      },
    });
  }

  preRender() {
    //
  }

  postRender() {
    //
  }

  connectedCallback() {
    this.preRender();
    if (this.pageTitle) {
      document.title = this.pageTitle;
    }

    this.innerHTML = this.render();
    this.bindEvents();
    this.postRender();
  }

  private bindEvents() {
    this.registerEventHandlers(this, EVENT_METADATA_KEY);
    this.registerEventHandlers(document, DOC_EVENT_METADATA_KEY);
    this.registerEventHandlers(window, WIN_EVENT_METADATA_KEY);
  }

  private unbindEvents() {
    this.cleanup.forEach((runCleanup) => runCleanup());
  }

  private registerEventHandlers(
    target: Document | BaseComponent | Window,
    key: symbol
  ) {
    const eventListeners: ComponentEventListeners[] =
      this.constructor.prototype[key] || [];
    eventListeners.forEach(({ eventName, methodName, selector }) => {
      const boundMethod = (this as any)[methodName].bind(this);

      if (!selector) {
        target.addEventListener(eventName, boundMethod);
        this.cleanup.push(() =>
          target.removeEventListener(eventName, boundMethod)
        );
        return;
      }

      if (target instanceof Window) {
        window.addEventListener(eventName, boundMethod);

        this.cleanup.push(() =>
          window.removeEventListener(eventName, boundMethod)
        );
      } else {
        const elements = target.querySelectorAll(selector);
        elements.forEach((element) => {
          element.addEventListener(eventName, boundMethod);
          this.cleanup.push(() =>
            element.removeEventListener(eventName, boundMethod)
          );
        });
      }
    });
  }

  disconnectedCallback() {
    this.unbindEvents();
  }

  render(): string {
    throw Error(`render not defined in ${this.constructor.name}`);
  }

  update() {
    const newHtml = this.render();
    const parsedHtml = new DOMParser().parseFromString(newHtml, 'text/html');

    const staleNodes = Array.from(this.children);
    const freshNodes = Array.from(parsedHtml.body.children);

    this.unbindEvents();
    this.diffAndPatch(staleNodes, freshNodes);
    this.bindEvents();
  }

  private diffAndPatch(staleNodes: Element[], freshNodes: Element[]) {
    const maxLength = Math.max(staleNodes.length, freshNodes.length);

    for (let i = 0; i < maxLength; i++) {
      const staleNode = staleNodes[i];
      const freshNode = freshNodes[i];

      if (!staleNode) {
        this.appendChild(freshNode.cloneNode(true) as Element);
      } else if (!freshNode) {
        staleNode.remove();
      } else if (staleNode.tagName === freshNode.tagName) {
        if (this.isCustomElement(staleNode)) {
          (staleNode as BaseComponent).update?.();
        } else {
          this.updateElements(staleNode, freshNode);
        }
      } else {
        staleNode.replaceWith(freshNode.cloneNode(true) as Element);
      }
    }
  }

  private updateElements(oldEl: Element, newEl: Element) {
    if (this.isCustomElement(oldEl)) {
      (oldEl as any).update?.();
      return;
    }

    this.updateSingleElement(oldEl, newEl);

    const oldChildren = Array.from(oldEl.children);
    const newChildren = Array.from(newEl.children);
    const maxLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];

      if (!oldChild) {
        oldEl.appendChild(newChild.cloneNode(true) as Element);
      } else if (!newChild) {
        oldChild.remove();
      } else if (oldChild.tagName === newChild.tagName) {
        this.updateElements(oldChild, newChild);
      } else {
        oldChild.replaceWith(newChild.cloneNode(true) as Element);
      }
    }
  }

  private isCustomElement(el: Element) {
    return (
      el instanceof BaseComponent &&
      !!customElements.get(el.tagName.toLowerCase())
    );
  }

  private updateSingleElement(oldEl: Element, newEl: Element) {
    const oldAttrs = new Map(
      Array.from(oldEl.attributes).map((attr) => [attr.name, attr.value])
    );
    const newAttrs = new Map(
      Array.from(newEl.attributes).map((attr) => [attr.name, attr.value])
    );

    newAttrs.forEach((value, name) => {
      if (oldAttrs.get(name) !== value) {
        oldEl.setAttribute(name, value);
      }
    });

    oldAttrs.forEach((_, name) => {
      if (!newAttrs.has(name)) {
        oldEl.removeAttribute(name);
      }
    });

    if (
      oldEl.children.length === 0 &&
      newEl.children.length === 0 &&
      oldEl.textContent !== newEl.textContent
    ) {
      oldEl.textContent = newEl.textContent;
    }
  }
}
