declare namespace StyleScssModule {
  export interface IStyleScss {
    article: string;
    background: string;
    centered: string;
    column: string;
    content: string;
    grid: string;
    submit: string;
    subtitle: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
