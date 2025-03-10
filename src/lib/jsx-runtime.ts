const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_ELEMENTS = new Set([
  "svg",
  "path",
  "circle",
  "rect",
  "line",
  "polygon",
  "polyline",
  "ellipse",
  "g",
  "defs",
  "clipPath",
  "mask",
  "use",
  "symbol",
  "linearGradient",
  "radialGradient",
  "stop",
  "filter",
  "feGaussianBlur",
  "feOffset",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
]);

export const jsx = {
  fragment: "",
  component(
    component: string | ((props: any) => HTMLElement),
    props: any,
    ...children: any[]
  ): HTMLElement | DocumentFragment | SVGElement {
    if (!props) props = {};
    props.children = children.flat();

    if (typeof component === "function") {
      return component(props);
    }

    const isSVG = SVG_ELEMENTS.has(component);
    const element = isSVG
      ? document.createElementNS(props["xmlns"] ?? SVG_NS, component)
      : document.createElement(component);

    for (const [key, value] of Object.entries(props)) {
      if (key === "children") continue;
      let attrName = key;

      switch (key) {
        case "className":
          attrName = "class";
        // TODO: add more later
      }

      if (
        typeof value === "function" &&
        key.startsWith("on") &&
        key.length > 2
      ) {
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, value as EventListener);
      } else {
        element.setAttribute(attrName, String(value));
      }
    }

    element.append(...props.children);
    return element;
  },
};
