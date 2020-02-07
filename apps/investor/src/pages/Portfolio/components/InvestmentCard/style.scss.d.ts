declare namespace StyleScssModule {
  export interface IStyleScss {
    amount: string;
    clock: string;
    date: string;
    hint: string;
    icon: string;
    info: string;
    item: string;
    label: string;
    logo: string;
    main: string;
    name: string;
    pending: string;
    value: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
