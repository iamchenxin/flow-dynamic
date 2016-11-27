// @flow
const util = require('util');

function log() {
  console.log.apply(null, arguments);
}

function warn() {
  console.warn.apply(null, arguments);
}

function format(v: mixed): string {
  return util.inspect(v, {depth: null});
}

export {
  log,
  warn,
  format,
};
