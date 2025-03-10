import { Component, PropsWithChildren } from "@/types/jsx";

export const jsx = {
  fragment: "",
  component(
    component: string | Component,
    props: PropsWithChildren,
    ...children: any[]
  ): HTMLElement | DocumentFragment {
    if (!props) props = {};
    props.children = children.flat();

    if (typeof component === "function") {
      return component(props);
    }

    const element =
      component.length === 0
        ? document.createDocumentFragment()
        : document.createElement(component);
    for (const [key, value] of Object.entries(props)) {
      if (key === "children") {
        continue;
      }

      if (typeof value == "function") {
        const eventName = key.substring(2);
        element.addEventListener(eventName, value as EventListener);
      } else if (element instanceof HTMLElement) {
        if (key === "class" || key === "className") {
          element.setAttribute("class", String(value));
        } else {
          element.setAttribute(key, String(value));
        }
      }
    }

    element.append(...props.children);

    return element;
  },
};
