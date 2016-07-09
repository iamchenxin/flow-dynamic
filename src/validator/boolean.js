/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';

export function isBoolean(v:mixed):boolean {
  if (typeof v !== 'boolean') {
    throw new RunTimeCheckE(`value:(${ePrint(v)}) should be boolean.`);
  }
  return v;
}
