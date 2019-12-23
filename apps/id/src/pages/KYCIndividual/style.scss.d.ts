declare namespace StyleScssModule {
  export interface IStyleScss {
    centered: string;
    column: string;
    form: string;
    grid: string;
    "group-title": string;
    groupTitle: string;
    submit: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
