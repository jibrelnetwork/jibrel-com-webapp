declare namespace StyleScssModule {
  export interface IStyleScss {
    border: string;
    cross: string;
    input: string;
    symbol: string;
    wrapper: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
