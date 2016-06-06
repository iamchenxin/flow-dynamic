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

import * as graph from './checker/graphql-ck.js';
import * as normal from './checker/normal.js';

const dev = dev_val;
export {
  pro,
  dev,
  cvt,
  graph,
  normal
};
