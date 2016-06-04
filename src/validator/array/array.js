/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import { mk_length } from './length.js';
import {
  isNumArr,
  isStrArr,
  isArrOf,
  dev as taDev
} from './typedarray.js';

function isArray(v:mixed):Array<mixed> {
  if (Array.isArray(v)) {
    const arr:Array<mixed> = v;
    return arr;
  }
  throw new RunTimeCheckE(`value:(${ePrint(v)}) is not a Array.`);
}

isArray.inLength = mk_length(isArray);

isArray.isNumArr = isNumArr;
isArray.isStrArr = isStrArr;
isArray.isArrOf = isArrOf;

const dev = {
  isArray:(v:any) => v
};
dev.isArray.isNumArr = taDev.isNumArr;
dev.isArray.isStrArr = taDev.isStrArr;
dev.isArray.isArrOf = taDev.isArrOf;

export {
  isArray,
  dev
};
