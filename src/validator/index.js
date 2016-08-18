/* @flow
 *
 */

import * as boolean from './boolean.js';
import * as _class from './class.js';
import * as _object from './object/object.js';
import * as _null from './null.js';
import * as maybe from './maybe.js';
import * as undef from './undef.js';
import * as undefNull from './undefnull.js';
import * as union from './union.js';
import * as number from './number/number.js';
import * as _array from './array/array.js';
import type {NumberRange, InRangeFn, ClipFn} from './number/number.js';

import * as _string from './string/string.js';
import * as _literal from './literal.js';
import * as _enum from './enum.js';
import {dev as dev_config} from './dev.js';

const pro = {
  isBoolean: boolean.isBoolean,
  isInstanceof:_class.isInstanceof,
  isNull:_null.isNull,
  nullable:_null.nullable,
  isMaybe: maybe.isMaybe,
  maybe: maybe.maybe,
  isUndef:undef.isUndef,
  undefable:undef.undefable,
  union:union.union,
  isLiteral:_literal.isLiteral,
  isEnum:_enum.isEnum,

  isNumber:number.isNumber,

  isString:_string.isString,
  isArray:_array.isArray,
  isObject:_object.isObject
};

const cvt = {
  isNumber:number.cvt,
  isUndefNull: undefNull.isUndefNull,
  undefNullable: undefNull.undefNullable,
};
let dev = pro;
if (process.env.NODE_ENV != 'dev') {
  dev = dev_config;
}

export {
  pro,
  dev,
  cvt
};
export type {
  NumberRange,
  InRangeFn,
  ClipFn
};
