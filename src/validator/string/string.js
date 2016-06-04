/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isAscii} from './isAscii.js';
import {
  isEmail,
  dev as EmDev
} from './isEmail.js';

function isString(v:mixed):string {
  if (typeof v !== 'string') {
    // flow need in function throw to resolve Type.
    throw new RunTimeCheckE(`value:(${ePrint(v)}) should be string.`);
  }
  return v;
}

isString.isAscii = isAscii;
isString.isEmail = isEmail;

const dev = {
  isString(v:any):any {
    return v;
  }
};
dev.isString.isEmail = (v:any) => v;
dev.isString.isAscii = (v:any) => v;
export {isString, dev};
