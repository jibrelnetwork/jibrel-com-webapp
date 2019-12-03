declare namespace StyleScssModule {
  export interface IStyleScss {
    error: string;
    field: string;
    frame: string;
    input: string;
    label: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
