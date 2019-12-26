declare namespace StyleScssModule {
  export interface IStyleScss {
    actions: string;
    button: string;
    centered: string;
    column: string;
    grid: string;
    hero: string;
    main: string;
    text: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
