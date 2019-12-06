declare namespace StyleScssModule {
  export interface IStyleScss {
    bar: string;
    button: string;
    fetching: string;
    good: string;
    icon: string;
    indicator: string;
    loading: string;
    normal: string;
    padding: string;
    password: string;
    strong: string;
    weak: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
