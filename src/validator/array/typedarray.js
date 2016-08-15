/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {
  mk_isLength,
  mk_inLength,
  mk_inLength_3args
} from './length.js';
import {
  isArray
} from './array.js';

function isNumArr(_v:mixed, eMsg?: string):Array<number> {
  // Flow can not infer the Array's inner type here
  // but the style like isStrArr,Flow can infer
  const v:Array<any> = isArray(v, eMsg);
  for ( const ele of v ) {
    if (typeof ele !== 'number') {
      const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not a number[].`;
      throw new RunTimeCheckE(msg);
    }
  }
  const arr:Array<number> = v;
  return arr;
}


function isStrArr(v:mixed, eMsg?: string):Array<string> {
  if (Array.isArray(v)) {
    for ( const ele of v ) {
      if (typeof ele !== 'string') {
        const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not a string[].`;
        throw new RunTimeCheckE(msg);
      }
    }
    const arr:Array<string> = v;
    return arr;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not a Array.`;
  throw new RunTimeCheckE(msg);
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

function isObjArr(v:mixed, eMsg?: string):Array<Object> {
  if (Array.isArray(v)) {
    for ( const ele of v ) {
      if (typeof ele !== 'object') {
        const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not a Object[].`;
        throw new RunTimeCheckE(msg);
      }
    }
    const arr:Array<Object> = v;
    return arr;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not a Array.`;
  throw new RunTimeCheckE(msg);
}

isNumArr.inLength = mk_inLength(isNumArr);
isStrArr.inLength = mk_inLength(isStrArr);
isObjArr.inLength = mk_inLength(isObjArr);
isArrOf.inLength = mk_inLength_3args(isArrOf);

isNumArr.isLength = mk_isLength(isNumArr);
isStrArr.isLength = mk_isLength(isStrArr);
isObjArr.isLength = mk_isLength(isObjArr);


export {
  isNumArr,
  isStrArr,
  isArrOf,
  isObjArr,
};
