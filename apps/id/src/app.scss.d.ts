declare namespace AppScssModule {
  export interface IAppScss {
    app: string;
    centered: string;
    chromeframe: string;
    column: string;
    field: string;
    fields: string;
    form: string;
    grid: string;
    title: string;
  }
}

declare const AppScssModule: AppScssModule.IAppScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppScssModule.IAppScss;
};

export = AppScssModule;
