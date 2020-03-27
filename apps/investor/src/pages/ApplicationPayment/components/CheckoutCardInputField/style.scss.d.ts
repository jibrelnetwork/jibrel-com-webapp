declare namespace StyleScssModule {
  export interface IStyleScss {
    bottom: string;
    cvv: string;
    date: string;
    frame: string;
    label: string;
    main: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
