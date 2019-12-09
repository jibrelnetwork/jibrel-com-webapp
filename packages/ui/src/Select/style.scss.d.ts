declare namespace StyleScssModule {
  export interface IStyleScss {
    content: string;
    "has-error": string;
    hasError: string;
    icon: string;
    "is-disabled": string;
    "is-open": string;
    isDisabled: string;
    isOpen: string;
    native: string;
    placeholder: string;
    preview: string;
    select: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
