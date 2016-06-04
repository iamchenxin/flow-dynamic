/* @flow
 *
 */

import {RunTimeCheckE, ePrint} from '../definition/def.js';

type Range = {
  min?:number,
  max?:number,
  intervals?:'[]'|'[)'|'(]'|'()'
};

// internal helper function ..
function testRange(v:number, range:Range):boolean {
  const { min, max, intervals:_intervals} = range;
  const intervals = _intervals?_intervals:'[]';
  switch (intervals) {
  case '[]':
    //javascript's ?: treat 0 as false,so must check min!=null
    return ((min!=null)? v>=min :true) && ((max!=null)? v<=max :true);
    // seems the express above could not be resolved by flow.
    // return (min || v>=min) && (max || v<= max);
  case '[)':
    return ((min!=null)? v>=min :true) && ((max!=null)? v<max :true);
  case '(]':
    return ((min!=null)? v>min :true) && ((max!=null)? v<=max :true);
  case '()':
    return ((min!=null)? v>min :true) && ((max!=null)? v<max :true);
  default:
    throw new RunTimeCheckE('The range.intervals must be ' +
    ' [] | [) | (] | () .Please check the passed in' +
    `range: ${ePrint(range)}`);
  }
}

export {
  testRange
};

export type {
  Range
};
