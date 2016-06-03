/* @flow
 *
 */

import {isString} from './string.js';
import {RunTimeCheckE} from '../../definition/def.js';

export default function contains(str:mixed, elem:string):string {
  const checked = isString(str);
  if ( checked.indexOf(elem) >= 0 ) {
    return checked;
  } else {
    throw new RunTimeCheckE(`value:(${str}) does not contain (${elem})`);
  }
}
