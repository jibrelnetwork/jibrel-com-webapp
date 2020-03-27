declare namespace StyleScssModule {
  export interface IStyleScss {
    actions: string;
    agreement: string;
    amount: string;
    anim: string;
    back: string;
    details: string;
    download: string;
    error: string;
    item: string;
    label: string;
    note: string;
    submit: string;
    success: string;
    value: string;
    warning: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
