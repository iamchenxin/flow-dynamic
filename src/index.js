/* @flow
 *
 */

import {
  pro,
  dev as dev_val,
  cvt
} from './validator/index.js';

export type {
  NumberRange,
  InRangeFn,
  ClipFn
} from './validator/index.js';

import {
  check,
  sourceCheck,
  argsCheck,
  complexCheck,
  dev as dev_gra
} from './checker/graphql-ck.js';

const dev = {
  ...dev_val,
  ...dev_gra
};
export {
  pro,
  dev,
  cvt,
  check,
  sourceCheck,
  argsCheck,
  complexCheck
};
