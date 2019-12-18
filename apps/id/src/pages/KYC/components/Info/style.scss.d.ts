declare namespace StyleScssModule {
  export interface IStyleScss {
    action: string;
    actions: string;
    additional: string;
    back: string;
    first: string;
    list: string;
    text: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
