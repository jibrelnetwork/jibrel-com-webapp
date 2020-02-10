declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    error: string;
    info: string;
    loader: string;
    loading: string;
    message: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
