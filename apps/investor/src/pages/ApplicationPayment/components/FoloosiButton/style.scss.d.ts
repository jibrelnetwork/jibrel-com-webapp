declare namespace StyleScssModule {
  export interface IStyleScss {
    "card-icon": string;
    "card-icons": string;
    cardIcon: string;
    cardIcons: string;
    error: string;
    "error-icon": string;
    errorIcon: string;
    loader: string;
    status: string;
    success: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
