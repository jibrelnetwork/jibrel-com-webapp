declare namespace StyleScssModule {
  export interface IStyleScss {
    button: string;
    disabled: string;
    icon: string;
    left: string;
    link: string;
    next: string;
    prev: string;
    right: string;
    text: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
