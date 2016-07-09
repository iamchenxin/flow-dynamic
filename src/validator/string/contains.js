/* @flow
 *
 */

import {isString} from './string.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';

export default function contains(str:mixed, elem:string):string {
  const checked = isString(str);
  if ( checked.indexOf(elem) >= 0 ) {
    return checked;
  } else {
    throw new RunTimeCheckE(`value:(${ePrint(str)}) does not contain (${elem})`);
  }
}
