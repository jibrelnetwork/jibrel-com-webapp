declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    actions: string;
    button: string;
    centered: string;
    choice: string;
    chromeframe: string;
    column: string;
    grid: string;
    info: string;
    "info-content": string;
    infoContent: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
