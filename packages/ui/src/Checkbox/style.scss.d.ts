declare namespace StyleScssModule {
  export interface IStyleScss {
    checkbox: string;
    disabled: string;
    error: string;
    field: string;
    info: string;
    input: string;
    label: string;
    off: string;
    success: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
