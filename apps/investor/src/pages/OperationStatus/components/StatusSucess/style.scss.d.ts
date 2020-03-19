declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    actions: string;
    body: string;
    "header-image": string;
    headerImage: string;
    "status-container": string;
    statusContainer: string;
    subtext: string;
    "success-title": string;
    successTitle: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
