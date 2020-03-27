declare namespace StyleScssModule {
  export interface IStyleScss {
    actions: string;
    agreement: string;
    amount: string;
    back: string;
    "button-description": string;
    buttonDescription: string;
    details: string;
    download: string;
    error: string;
    form: string;
    item: string;
    label: string;
    note: string;
    "risk-annotation": string;
    riskAnnotation: string;
    sticky: string;
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
