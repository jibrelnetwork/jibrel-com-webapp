declare namespace StyleScssModule {
  export interface IStyleScss {
    available: string;
    balance: string;
    border: string;
    buttons: string;
    current: string;
    deposit: string;
    description: string;
    green: string;
    "invested-loader": string;
    investedLoader: string;
    investments: string;
    loader: string;
    note: string;
    opportunities: string;
    subtitle: string;
    title: string;
    withdraw: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
