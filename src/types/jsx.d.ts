declare global {
  namespace JSX {
    interface DOMAttributes<T> {}

    interface HTMLAttributes<T> extends DOMAttributes<T> {
      id?: string;
      className?: string;
      style?: string | Record<string, string>;
      [key: string]: any;
    }

    interface SVGAttributes<T> extends DOMAttributes<T> {
      className?: string;
      fill?: string;
      stroke?: string;
      strokeWidth?: number | string;
      [key: string]: any;
    }

    type HTMLIntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: HTMLAttributes<
        HTMLElementTagNameMap[K]
      >;
    };

    type SVGIntrinsicElements = {
      [K in Exclude<
        keyof SVGElementTagNameMap,
        keyof HTMLElementTagNameMap
      >]: SVGAttributes<SVGElementTagNameMap[K]>;
    };

    type IntrinsicElements = HTMLIntrinsicElements & SVGIntrinsicElements;
  }
}

export type PropsWithChildren<T = Record<string, any>> = T & {
  children?: any;
} & Record<string, any>;

export type Component = (props: PropsWithChildren) => HTMLElement;
