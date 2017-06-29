const Transformer = require('./src/transformer.js').default;
const Reader = require('./src/reader.js').default;
const Writer = require('./src/writer.js').default;
const Constants = require('./src/constants.js');

module.exports = {
  transform: Transformer.transform,
  read: Reader.read,
  write: Writer.write,
  TYPE_YAML: Constants.TYPE_YAML,
  TYPE_JS: Constants.TYPE_JS,
  TYPE_JSON: Constants.TYPE_JSON,
};

