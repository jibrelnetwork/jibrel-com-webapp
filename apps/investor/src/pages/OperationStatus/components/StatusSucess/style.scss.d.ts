declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    actions: string;
    body: string;
    details: string;
    error: string;
    header: string;
    "header-image": string;
    headerImage: string;
    pending: string;
    "status-container": string;
    statusContainer: string;
    subtext: string;
    success: string;
    "success-title": string;
    successTitle: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
