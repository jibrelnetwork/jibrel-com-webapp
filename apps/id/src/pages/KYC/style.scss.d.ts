declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    actions: string;
    background: string;
    button: string;
    centered: string;
    choice: string;
    chromeframe: string;
    column: string;
    grid: string;
    income: string;
    info: string;
    "info-content": string;
    infoContent: string;
    personal: string;
    residency: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
