declare namespace SignupScssModule {
  export interface ISignupScss {
    action: string;
    main: string;
    signin: string;
    submit: string;
    terms: string;
  }
}

declare const SignupScssModule: SignupScssModule.ISignupScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SignupScssModule.ISignupScss;
};

export = SignupScssModule;
