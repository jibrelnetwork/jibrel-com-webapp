declare namespace StyleScssModule {
  export interface IStyleScss {
    icon: string;
    "is-disabled": string;
    "is-selected": string;
    isDisabled: string;
    isSelected: string;
    section: string;
    tab: string;
    tabs: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
