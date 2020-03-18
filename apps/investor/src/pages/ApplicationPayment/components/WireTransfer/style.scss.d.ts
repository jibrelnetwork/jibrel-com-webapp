declare namespace StyleScssModule {
  export interface IStyleScss {
    actions: string;
    body: string;
    button: string;
    "details-wrapper": string;
    detailsWrapper: string;
    header: string;
    subtext: string;
    warning: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
