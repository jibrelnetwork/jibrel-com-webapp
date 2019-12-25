declare namespace StyleScssModule {
  export interface IStyleScss {
    blue: string;
    button: string;
    dot: string;
    first: string;
    firstDotAnimation: string;
    gray: string;
    loader: string;
    loading: string;
    main: string;
    second: string;
    secondDotAnimation: string;
    secondary: string;
    third: string;
    thirdDotAnimation: string;
    white: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
