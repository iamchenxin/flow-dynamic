/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isAscii} from './isAscii.js';
import {
  isEmail
} from './isEmail.js';

function isString(v:mixed, eMsg?: string):string {
  if (typeof v !== 'string') {
    // flow need in function throw to resolve Type.
    const msg = eMsg?eMsg:`value:(${ePrint(v)}) should be string.`;
    throw new RunTimeCheckE(msg);
  }
  return v;
}

isString.isAscii = isAscii;
isString.isEmail = isEmail;

// ToDo: Should remove dev here!,all dev config is in dev.js
const dev = {
  isString(v:any):any {
    return v;
  }
};
dev.isString.isEmail = (v:any):any => v;
dev.isString.isAscii = (v:any):any => v;
export {isString, dev};
