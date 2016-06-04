/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {testRange} from '../../utils/utils.js';
import type {Range} from '../../utils/utils.js';

function mk_length<T>(arrFn:(v:any)=>Array<T>)
:(v:mixed, range:Range)=>Array<T> {
  return inLength;
  function inLength(_v:mixed, range:Range):Array<T> {
    const arr = arrFn(_v);
    const length = arr.length;
    if ( testRange(length, range)) {
      return arr;
    } else {
      throw new RunTimeCheckE(`Array.length(${length}) is out ` +
      `Range:\n${ePrint(range)}`);
    }
  }
}

function mk_length_3args<T>(arrFn:(v:any, _class:Class<T>)=>Array<T>)
:(_v:mixed, _class:Class<T>, range:Range) => Array<T> {
  return inLength;
  function inLength<T>(_v:mixed, _class:Class<T>, range:Range)
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
  mk_length,
  mk_length_3args
};
