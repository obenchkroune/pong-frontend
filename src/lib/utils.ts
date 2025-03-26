import { BaseComponent } from "../components/BaseComponent";

export function customElement(
  name: string,
  options?: ElementDefinitionOptions
) {
  return function (target: typeof HTMLElement) {
    customElements.define(name, target, options);
  };
}

export const EVENT_METADATA_KEY = Symbol("eventListeners");
export const WIN_EVENT_METADATA_KEY = Symbol("winEventListeners");
export const DOC_EVENT_METADATA_KEY = Symbol("docEeventListeners");

export type ComponentEventListeners = {
  methodName: string;
  eventName: string;
  selector?: string;
};

export function onEvent(eventName: string, selector?: string) {
  return function (target: BaseComponent, propertyKey: string) {
    // Ensure the metadata storage exists
    if (!target.constructor.prototype[EVENT_METADATA_KEY]) {
      target.constructor.prototype[EVENT_METADATA_KEY] = [];
    }

    // Store event listener metadata
    target.constructor.prototype[EVENT_METADATA_KEY].push({
      eventName,
      methodName: propertyKey,
      selector,
    });
  };
}

export function onDoc(eventName: string, selector?: string) {
  return function (target: BaseComponent, propertyKey: string) {
    // Ensure the metadata storage exists
    if (!target.constructor.prototype[DOC_EVENT_METADATA_KEY]) {
      target.constructor.prototype[DOC_EVENT_METADATA_KEY] = [];
    }

    // Store event listener metadata
    target.constructor.prototype[DOC_EVENT_METADATA_KEY].push({
      eventName,
      methodName: propertyKey,
      selector,
    });
  };
}

export function onWin(eventName: string) {
  return function (target: BaseComponent, propertyKey: string) {
    // Ensure the metadata storage exists
    if (!target.constructor.prototype[WIN_EVENT_METADATA_KEY]) {
      target.constructor.prototype[WIN_EVENT_METADATA_KEY] = [];
    }

    // Store event listener metadata
    target.constructor.prototype[WIN_EVENT_METADATA_KEY].push({
      eventName,
      methodName: propertyKey,
    });
  };
}

export function html(strings: TemplateStringsArray, ...args: any[]) {
  const container = document.createElement("div");
  const html = strings.reduce((acc, str, i) => {
    if (typeof args[i] === "function") {
      const content = args[i]();
      if (Array.isArray(content)) {
        return acc + str + content.map((el) => String(el ?? "")).join("");
      }
      return acc + str + String(args[i]() ?? "");
    }

    // sanitize
    if (Array.isArray(args[i])) {
      container.innerText = args[i].map((el) => String(el ?? "")).join("");
    } else {
      container.innerText = String(args[i] ?? "");
    }
    return acc + str + container.innerHTML;
  }, "");
  return html;
}
