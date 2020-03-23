declare namespace StyleScssModule {
  export interface IStyleScss {
    "add-link": string;
    addLink: string;
    "additional-title": string;
    additionalTitle: string;
    address: string;
    background: string;
    beneficiary: string;
    caption: string;
    close: string;
    company: string;
    contact: string;
    director: string;
    "group-title": string;
    groupTitle: string;
    step: string;
    submit: string;
    "submit-error": string;
    submitError: string;
    subtitle: string;
    title: string;
  }
}

declare const StyleScssModule: StyleScssModule.IStyleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StyleScssModule.IStyleScss;
};

export = StyleScssModule;
