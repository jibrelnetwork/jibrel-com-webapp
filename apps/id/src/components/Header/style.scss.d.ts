declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    centered: string;
    chromeframe: string;
    column: string;
    grid: string;
    header: string;
    logo: string;
    main: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
