/* @flow
 *
 */

import {isString} from './string.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';
/* eslint-disable no-control-regex */
const ascii = /^[\x00-\x7F]+$/;
/* eslint-enable no-control-regex */

export function isAscii(_str:mixed):string {
  const v = isString(_str);
  if ( ascii.test(v) ) {
    return v;
  } else {
    throw new RunTimeCheckE(`(${ePrint(_str)}) is not ascii`);
  }
}
