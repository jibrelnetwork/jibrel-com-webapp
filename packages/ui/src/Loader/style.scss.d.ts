declare namespace StyleScssModule {
  export interface IStyleScss {
    blue: string;
    dot: string;
    first: string;
    firstDotAnimation: string;
    gray: string;
    "hover-blue": string;
    "hover-gray": string;
    "hover-white": string;
    hoverBlue: string;
    hoverGray: string;
    hoverWhite: string;
    loader: string;
    second: string;
    secondDotAnimation: string;
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
