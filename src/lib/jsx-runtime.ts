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
      if (typeof value === "function" && key.startsWith("on")) {
        const eventName = key.substring(2);
        element.addEventListener(eventName, value);
      } else if (element instanceof HTMLElement) {
        if (key === "class" || key === "className") {
          element.setAttribute("class", value);
        } else {
          element.setAttribute(key, value);
        }
      }
    }

    element.append(...props.children);

    return element;
  },
};
