/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';

export function isBoolean(v:mixed, eMsg?: string):boolean {
  if (typeof v !== 'boolean') {
    const msg = eMsg?eMsg:`value:(${ePrint(v)}) should be boolean.`;
    throw new RunTimeCheckE(msg);
  }
  return v;
}
