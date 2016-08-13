/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {
  mk_isLength,
  mk_inLength,
  mk_inLength_3args
} from './length.js';

function isNumArr(v:mixed):Array<number> {
  if (Array.isArray(v)) {
    for ( const ele of v ) {
      if (typeof ele !== 'number') {
        throw new RunTimeCheckE(`value:(${ePrint(v)}) is not a number[].`);
      }
    }
    const arr:Array<number> = v;
    return arr;
  }
  throw new RunTimeCheckE(`value:(${ePrint(v)}) is not a Array.`);
}


function isStrArr(v:mixed):Array<string> {
  if (Array.isArray(v)) {
    for ( const ele of v ) {
      if (typeof ele !== 'string') {
        throw new RunTimeCheckE(`value:(${ePrint(v)}) is not a string[].`);
      }
    }
    const arr:Array<string> = v;
    return arr;
  }
  throw new RunTimeCheckE(`value:(${ePrint(v)}) is not a Array.`);
}

function isArrOf<T>(v:mixed, _class:Class<T>):Array<T> {
  if (Array.isArray(v)) {
    for ( const ele of v ) {
      if ( (ele instanceof _class)!==true ) {
        throw new RunTimeCheckE(`value:(${ePrint(v)}) is not a _class[].`);
      }
    }
    const arr:Array<T> = v;
    return arr;
  }
  throw new RunTimeCheckE(`value:(${ePrint(v)}) is not a Array.`);
}

isNumArr.inLength = mk_inLength(isNumArr);
isStrArr.inLength = mk_inLength(isStrArr);
isArrOf.inLength = mk_inLength_3args(isArrOf);

isNumArr.isLength = mk_isLength(isNumArr);
isStrArr.isLength = mk_isLength(isStrArr);


export {
  isNumArr,
  isStrArr,
  isArrOf
};
