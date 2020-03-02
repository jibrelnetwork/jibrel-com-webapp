declare namespace StyleScssModule {
  export interface IStyleScss {
    amount: string;
    date: string;
    email: string;
    item: string;
    label: string;
    left: string;
    logo: string;
    main: string;
    name: string;
    pay: string;
    right: string;
    value: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
