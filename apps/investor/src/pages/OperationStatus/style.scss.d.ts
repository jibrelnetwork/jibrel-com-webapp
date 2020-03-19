declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    actions: string;
    body: string;
    details: string;
    header: string;
    "header-image": string;
    headerImage: string;
    "image-error": string;
    "image-pending": string;
    "image-success": string;
    imageError: string;
    imagePending: string;
    imageSuccess: string;
    "loading-container": string;
    loadingContainer: string;
    "status-container": string;
    statusContainer: string;
    subtext: string;
    title: string;
    "title-error": string;
    "title-pending": string;
    "title-success": string;
    titleError: string;
    titlePending: string;
    titleSuccess: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
