declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    actions: string;
    button: string;
    choice: string;
    content: string;
    info: string;
    support: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
