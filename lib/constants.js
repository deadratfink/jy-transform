module.exports.YAML = 'yaml';
module.exports.JSON = 'json';
module.exports.JS   = 'js';
module.exports.TARGETS = [ this.YAML, this.JSON, this.JS ];
module.exports.DEFAULT_OPTIONS = {
    target: this.JS,
    src: null,
    dest: 'relative to input file.',
    indent:  4
};
