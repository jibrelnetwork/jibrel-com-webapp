const path = require('path')
const fs = require('fs').promises
const validateOptions = require('schema-utils')

const HEALTCHCHECK_DATA = '{"healthy":true}'

const schema = {
  type: 'object',
  properties: {
    publicPath: {
      type: 'string',
    },
  },
}

module.exports = class HealthcheckPlugin {
  constructor(options = {}){
    validateOptions(schema, options, 'Healthcheck Plugin')

    this.options = options
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise(
      'HealthcheckPlugin',
      () => fs.writeFile(
        path.resolve(this.options.publicPath, 'healthcheck.json'),
        HEALTCHCHECK_DATA,
      )
    );
  }
}
