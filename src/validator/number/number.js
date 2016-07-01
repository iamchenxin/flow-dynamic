/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
//import type {TypeCaster} from '../../definition/def.js';
import {mk_inRange, mk_clip} from './helper.js';
import type {NumberRange, InRangeFn, ClipFn} from './helper.js';

function isNumber(v:mixed, eMsg?:string):number {
  if (typeof v !== 'number') {
    const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not a number.`;
    throw new RunTimeCheckE(msg);
  }
  return v;
}

const inRange:InRangeFn = mk_inRange(isNumber);
const clip:ClipFn = mk_clip(isNumber, 'passed in to clip() is not a number');

import * as _float from './float.js';
import * as _int from './int.js';
isNumber.inRange = inRange;
isNumber.isInt = _int.isInt;
isNumber.isFloat = _float.isFloat;
const cvt = {
  clip:clip,
  isInt:_int.cvt,
  isFloat:_float.cvt,
};
export {
  isNumber,
  cvt
};

export type {
  NumberRange,
  InRangeFn,
  ClipFn
};
