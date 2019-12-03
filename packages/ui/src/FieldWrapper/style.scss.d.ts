declare namespace StyleScssModule {
  export interface IStyleScss {
    error: string;
    info: string;
    message: string;
    success: string;
    wrapper: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
