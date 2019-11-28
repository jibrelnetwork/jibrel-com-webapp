declare namespace GridScssModule {
  export interface IGridScss {
    centered: string;
    column: string;
    grid: string;
  }
}

declare const GridScssModule: GridScssModule.IGridScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: GridScssModule.IGridScss;
};

export = GridScssModule;
