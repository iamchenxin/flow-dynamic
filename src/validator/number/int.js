/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isNumber, mk_inRange, mk_clip} from './number.js';
import type { InRangeFn, ClipFn} from './number.js';

function isInt(_v:mixed, eMsg?:string):number {
  const v = isNumber(_v);
  if ( Number.isInteger(v) ) {
    return v;
  }
  const msg = eMsg?eMsg:`value(${ePrint(v)}) is not a integer`;
  throw new RunTimeCheckE(msg);
}

const inRange:InRangeFn<number> = mk_inRange(isInt);
const clip:ClipFn<number> = mk_clip(isInt,
  'passed in to clip() is not a integer');

const cvt = {
  clip:clip
};
isInt.inRange = inRange;
export {
  isInt,
  cvt
};
