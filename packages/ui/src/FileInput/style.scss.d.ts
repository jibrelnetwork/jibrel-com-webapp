declare namespace StyleScssModule {
  export interface IStyleScss {
    active: string;
    border: string;
    button: string;
    error: string;
    field: string;
    icon: string;
    input: string;
    label: string;
    loading: string;
    name: string;
    placeholder: string;
    size: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
