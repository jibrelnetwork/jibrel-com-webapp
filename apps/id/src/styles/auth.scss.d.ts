declare namespace AuthScssModule {
  export interface IAuthScss {
    action: string;
    centered: string;
    chromeframe: string;
    column: string;
    error: string;
    field: string;
    fields: string;
    form: string;
    grid: string;
    main: string;
    submit: string;
    switch: string;
    title: string;
    wide: string;
  }
}

declare const AuthScssModule: AuthScssModule.IAuthScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AuthScssModule.IAuthScss;
};

export = AuthScssModule;
