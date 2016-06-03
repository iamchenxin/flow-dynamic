/* @flow
*
*/

import {RunTimeCheckE} from '../definition/def.js';

export function isBoolean(v:mixed):boolean {
  if (typeof v !== 'boolean') {
    throw new RunTimeCheckE(`value:(${v}) should be boolean.`);
  }
  return v;
}
