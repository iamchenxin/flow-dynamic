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
  pro as pro_nor,
  dev as dev_nor
} from './checker/normal.js';

const pro = {
  ...pro_val,
  ...pro_gra,
  ...pro_nor
};

const dev = {
  ...dev_val,
  ...dev_gra,
  ...dev_nor
};

export {
  pro,
  cvt,
  dev
};
