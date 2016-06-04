/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {
  mk_length,
  mk_length_3args
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

isNumArr.inLength = mk_length(isNumArr);
isStrArr.inLength = mk_length(isStrArr);
isArrOf.inLength = mk_length_3args(isArrOf);

const _copy1 = (v:any) => v;
const dev = {
  isNumArr : _copy1,
  isStrArr : _copy1,
  isArrOf : (v:any, c:any) => v
};

const _copy2 = (v:any) => v;
dev.isNumArr.inLength = _copy2;
dev.isStrArr.inLength = _copy2;
dev.isArrOf.inLength = _copy2;

export {
  isNumArr,
  isStrArr,
  isArrOf,
  dev
};
