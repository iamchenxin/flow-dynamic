/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import { mk_inLength, mk_isLength } from './length.js';
import {
  isNumArr,
  isStrArr,
  isArrOf
} from './typedarray.js';

function isArray(v:mixed, eMsg?:string):Array<mixed> {
  if (Array.isArray(v)) {
    const arr:Array<mixed> = v;
    return arr;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not a Array.`;
  throw new RunTimeCheckE(msg);
}

isArray.inLength = mk_inLength(isArray);
isArray.isLength = mk_isLength(isArray);

isArray.isNumArr = isNumArr;
isArray.isStrArr = isStrArr;
isArray.isArrOf = isArrOf;


export {
  isArray,
};
