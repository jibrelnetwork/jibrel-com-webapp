declare namespace StyleScssModule {
  export interface IStyleScss {
    centered: string;
    column: string;
    grid: string;
    "group-title": string;
    groupTitle: string;
    step: string;
    "step-title": string;
    stepTitle: string;
    submit: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
