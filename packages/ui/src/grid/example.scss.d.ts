declare namespace ExampleScssModule {
  export interface IExampleScss {
    centered: string;
    column: string;
    first: string;
    grid: string;
    inside: string;
    second: string;
    third: string;
  }
}

declare const ExampleScssModule: ExampleScssModule.IExampleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ExampleScssModule.IExampleScss;
};

export = ExampleScssModule;
