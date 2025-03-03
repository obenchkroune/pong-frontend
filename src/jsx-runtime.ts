export function myCreateElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<Record<string, any>> | null,
  ...children: (Node | string)[]
): HTMLElement {
  const element = document.createElement(tag);

  if (props) {
    for (const key in props) {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        element.addEventListener(key.slice(2).toLowerCase(), props[key]);
      } else if (key !== 'children') {
        element.setAttribute(key, props[key] as string);
      }
    }
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });

  return element;
}

export function Fragment({ children }: { children: (Node | string)[] }) {
  return children;
}

// Fully define JSX types
declare global {
  namespace JSX {
    type Element = HTMLElement;
    interface IntrinsicElements {
      div: Partial<HTMLDivElement>;
      button: Partial<HTMLButtonElement>;
      h1: Partial<HTMLHeadingElement>;
      span: Partial<HTMLSpanElement>;
      // Add more elements here if needed
    }
  }
}
