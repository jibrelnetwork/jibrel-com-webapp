declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    button: string;
    countdown: string;
    description: string;
    error: string;
    wide: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
