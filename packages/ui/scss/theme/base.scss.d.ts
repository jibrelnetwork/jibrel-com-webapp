declare namespace BaseScssModule {
  export interface IBaseScss {
    chromeframe: string;
  }
}

declare const BaseScssModule: BaseScssModule.IBaseScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BaseScssModule.IBaseScss;
};

export = BaseScssModule;
