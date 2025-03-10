declare global {
  namespace JSX {
    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: Record<string, any>;
    };
  }
}

export type PropsWithChildren<T = Record<string, any>> =
  | T & { children?: any } & Record<string, any>;

export type Component = (props: PropsWithChildren) => HTMLElement;
