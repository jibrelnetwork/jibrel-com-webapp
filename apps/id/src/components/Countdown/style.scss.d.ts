declare namespace StyleScssModule {
  export interface IStyleScss {
    fraction: string;
    main: string;
    min: string;
    number: string;
    sec: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
