declare namespace StyleScssModule {
  export interface IStyleScss {
    background: string;
    error: string;
    form: string;
    message: string;
    note: string;
    privacy: string;
    submit: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
