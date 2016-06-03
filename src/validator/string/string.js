/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isAscii} from './isAscii.js';

function isString(v:mixed):string {
  if (typeof v !== 'string') {
    // flow need in function throw to resolve Type.
    throw new RunTimeCheckE(`value:(${ePrint(v)}) should be string.`);
  }
  return v;
}

isString.isAscii = isAscii;
function _copy(v:mixed):any {
  return v;
}
function _copy2(v:mixed):any {
  return v;
}
_copy.isAscii = _copy2;
const dev = _copy;
export {isString, dev};
