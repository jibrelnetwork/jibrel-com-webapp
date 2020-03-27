declare namespace StyleScssModule {
  export interface IStyleScss {
    caption: string;
    error: string;
    loader: string;
    lock: string;
    status: string;
    title: string;
    unavailable: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
