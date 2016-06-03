/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isNumber} from './number.js';
import {mk_inRange, mk_clip} from './helper.js';
import type {NumberRange, InRangeFn, ClipFn} from './helper.js';

function isFloat(_v:mixed, eMsg?:string):number {
  const v = isNumber(_v);
  if (Number.isInteger(v) || Number.isNaN(v)) {
    const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not a float`;
    throw new RunTimeCheckE(msg);
  }
  return v;
}

const inRange:InRangeFn<number> = mk_inRange(isFloat);
//const clip:ClipFn<number> = mk_clip(isFloat,
//  'passed in to clip() is not a float');
const clip:(_v:mixed, range:?NumberRange, _default:number) => number
  = mk_clip(isFloat, 'passed in to clip() is not a float');

const cvt = {
  clip:clip
};
isFloat.inRange = inRange;
export {
  isFloat,
  cvt
};
