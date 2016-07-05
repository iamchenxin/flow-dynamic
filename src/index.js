/* @flow
 *
 */

import {
  pro as pro_val,
  dev as dev_val,
  cvt
} from './validator/index.js';

export type {
  NumberRange,
  InRangeFn,
  ClipFn
} from './validator/index.js';

import {
  pro as pro_gra,
  dev as dev_gra
} from './checker/graphql-ck.js';
import {
  pro as pro_std,
  dev as dev_std
} from './checker/standard.js';

const pro = {
  ...pro_val,
  ...pro_gra,
  ...pro_std
};

const dev = {
  ...dev_val,
  ...dev_gra,
  ...dev_std
};

export {
  pro,
  cvt,
  dev
};
