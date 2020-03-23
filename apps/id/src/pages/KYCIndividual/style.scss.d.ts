declare namespace StyleScssModule {
  export interface IStyleScss {
    background: string;
    form: string;
    "group-title": string;
    groupTitle: string;
    income: string;
    personal: string;
    residency: string;
    submit: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
