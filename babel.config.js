module.exports = {
  presets: [
    ["@babel/preset-typescript"],
    ["@babel/preset-env", { "useBuiltIns": "entry", "corejs": 3 }],
    "@lingui/react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-transform-runtime", { "corejs": 3 }],
    "macros"
  ],
  retainLines: true,
  env: {
    "development": {
      "presets": [["@babel/preset-react", { "development": true }]]
    },
    "test": {
      "presets": [["@babel/preset-react", { "development": true }]]
    },
    "production": {
      "presets": ["@babel/preset-react"]
    }
  }
}
