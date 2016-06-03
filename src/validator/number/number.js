/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import type {TypeCaster} from '../../definition/def.js';

type NumberRange = {
  min?:number,
  max?:number,
  intervals:'[]'|'[)'|'(]'|'()'
};

function isNumber(v:mixed, eMsg?:string):number {
  if (typeof v !== 'number') {
    const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not a number.`;
    throw new RunTimeCheckE(msg);
  }
  return v;
}

// internal helper function ..
type InRangeFn<T> = (_v:mixed, range:NumberRange, eMsg?:string) => T;
function mk_inRange<T>(isType:TypeCaster<T>):InRangeFn<T> {
  return inRange;
  function inRange(_v:mixed, range:NumberRange, eMsg?:string):T {
    const v = isType(_v);
    if (range && testRange(v, range)) {
      return v;
    } else {
      const msg = eMsg?eMsg:`value(${ePrint(v)}) is not in ` +
      `Range: ${ePrint(range)}`;
      throw new RunTimeCheckE(msg);
    }
  }
}

// internal helper function ..
type ClipFn<T> = (_v:mixed, range:?NumberRange, _default:number) => T;
function mk_clip<T>(isType:TypeCaster<T>, addeMsg:string):ClipFn<T> {
  return clip;
  function clip(_v:mixed, range:?NumberRange, _default:T):T {
    const v = isType(_v);
    const defv = isType(_default, `The _default(${_default}) ` +
    addeMsg);
    if (range && testRange(v, range)) {
      return v;
    }
    return defv;
  }
}

// internal helper function ..
function testRange(v:number, range:NumberRange):boolean {
  const { min, max, intervals} = range;
  const hasMin = (min!=null); //javascript's ?: treat 0 as false
  const hasMax = (max!=null);
  switch (intervals) {
  case '[]':
    return (hasMin? v>=min :true) && (hasMax? v<=max :true);
    // seems the express above could not be resolved by flow.
    // return (min || v>=min) && (max || v<= max);
  case '[)':
    return (hasMin? v>=min :true) && (hasMax? v<max :true);
  case '(]':
    return (hasMin? v>min :true) && (hasMax? v<=max :true);
  case '()':
    return (hasMin? v>min :true) && (hasMax? v<max :true);
  default:
    throw new RunTimeCheckE('The range.intervals must be ' +
    ' [] | [) | (] | () .Please check the passed in' +
    `range: ${ePrint(range)}`);
  }
}

const inRange:InRangeFn<number> = mk_inRange(isNumber);
const clip:ClipFn<number> = mk_clip(isNumber,
  'passed in to clip() is not a number');

isNumber.inRange = inRange;
const cvt = {
  clip:clip
};
export {
  isNumber,
  cvt,
  testRange,
  mk_inRange,
  mk_clip
};

export type {
  NumberRange,
  InRangeFn,
  ClipFn
};
