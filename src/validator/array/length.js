/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {testRange} from '../../utils/utils.js';
import type {Range} from '../../utils/utils.js';

// return a function length(), test the array length
type LengthCompare = (length:number) => boolean;

function mk_isLength<T>(arrFn:(v:any)=>Array<T>):
(v:mixed, compare:LengthCompare) => Array<T> {
  return lengthFn;
  function lengthFn(_v:mixed, compare:LengthCompare):Array<T> {
    const arr = arrFn(_v);
    if ( compare(arr.length) ) {
      return arr;
    } else {
      throw new RunTimeCheckE(`Array(${ePrint(_v)})length(${arr.length}), ` +
      'is out of range.');
    }
  }
}

// return a function inLength()
function mk_inLength<T>(arrFn:(v:any)=>Array<T>)
:(v:mixed, range:Range)=>Array<T> {
  return inLength;
  function inLength(_v:mixed, range:Range):Array<T> {
    const arr = arrFn(_v);
    const length = arr.length;
    if ( testRange(length, range)) {
      return arr;
    } else {
      throw new RunTimeCheckE(`Array(${ePrint(_v)})length(${length}) ` +
      `is out Range:\n${ePrint(range)}`);
    }
  }
}

function mk_inLength_3args<T>(arrFn:(v:any, _class:Class<T>)=>Array<T>)
:(_v:mixed, _class:Class<T>, range:Range) => Array<T> {
  return inLength;
  function inLength(_v:mixed, _class:Class<T>, range:Range)
  :Array<T> {
    const arr = arrFn(_v, _class);
    const length = arr.length;
    if ( testRange(length, range)) {
      return arr;
    } else {
      throw new RunTimeCheckE(`Array.length(${length}) is out ` +
      `Range:\n${ePrint(range)}`);
    }
  }
}

export {
  mk_isLength,
  mk_inLength,
  mk_inLength_3args
};
