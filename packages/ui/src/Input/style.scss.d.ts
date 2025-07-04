declare namespace StyleScssModule {
  export interface IStyleScss {
    border: string;
    error: string;
    input: string;
    label: string;
    wrapper: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
