/* @flow
 *
 */

import {
  pro as pro_val,
  dev as dev_val,
  cvt as cvt_val
} from './validator/index.js';

import {
  pro as pro_gra,
  dev as dev_gra
} from './checker/graphql-ck.js';
import {
  pro as pro_std,
  dev as dev_std
} from './checker/standard.js';
import {
  pro as pro_cast,
  dev as dev_cast
} from './checker/directcast.js';

import * as utils from './utils/utils.js';

const pro = {
  ...pro_val,
  ...pro_gra,
  ...pro_std,
  ...pro_cast,
};

const dev = {
  ...dev_val,
  ...dev_gra,
  ...dev_std,
  ...dev_cast,
};

// ToDo: should make dev checker can not use cvt
const cvt = {
  ...cvt_val,
};


export {
  pro,
  cvt,
  dev,
  utils
};

// export type
export type {
  Range
} from './utils/utils.js';

export type {
  NumberRange,
  InRangeFn,
  ClipFn
} from './validator/index.js';

export type {
  TypeCaster,
  ComplexCaster
} from './definition/def.js';
