/* @flow
 *
 */

import * as boolean from './boolean.js';
import * as _class from './class.js';
import * as _null from './null.js';
import * as undef from './undef.js';
import * as union from './union.js';
import * as number from './number/number.js';
import type {NumberRange, InRangeFn, ClipFn} from './number/number.js';
import * as _int from './number/int.js';
import * as _float from './number/float.js';

import * as _string from './string/string.js';

const pro = {
  isBoolean: boolean.isBoolean,
  isInstanceof:_class.isInstanceof,
  isNull:_null.isNull,
  nullable:_null.nullable,
  isUndef:undef.isUndef,
  undefable:undef.undefable,
  union:union.union,

  isNumber:number.isNumber, // has isNumber.inRange
  isInt:_int.isInt, // isInt.inRange
  isFloat:_float.isFloat, // isFloat.inRange

  isString:_string.isString
};

const cvt = {
  isNumber:number.cvt,
  isInt:_int.cvt,
  isFloat:_float.cvt
};

let dev = pro;
if (process.env.NODE_ENV != 'dev') {
  function _copy(v:mixed):any {
    return v;
  }
  function returnCopy():(v:mixed)=>any {
    return function(v:mixed):any {
      return v;
    };
  }
  _copy.inRange = _copy;
  dev = {
    isBoolean: _copy,
    isInstanceof:_copy,
    isNull:_copy,
    nullable:returnCopy,
    isUndef:_copy,
    undefable:returnCopy,
    union:returnCopy,

    isNumber:_copy, // has isNumber.inRange
    isInt:_copy, // isInt.inRange
    isFloat:_copy, // isFloat.inRange

    isString:_string.dev
  };
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
