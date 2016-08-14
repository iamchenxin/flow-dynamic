/* @flow
*
*/
import {RunTimeCheckE, ePrint} from '../definition/def.js';
import type {TypeCaster} from '../definition/def.js';

/* Note: This is a converter, will cast null|void -> null
 *
*/

function isUndefNull(v:mixed, eMsg: ?string):null {
  if (typeof v === 'undefined' || v === null) {
    return null;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) should be null|void.`;
  throw new RunTimeCheckE(msg);
}

/* Note: This is a converter, will cast any -> null|T
*/
type UndefNullableCaster<T> = (v:any, eMsg?: string) => null|T;
function undefNullable<T>(f: TypeCaster<T>): UndefNullableCaster<T> {
  return function(v:mixed, eMsg?: string):null|T {
    if (typeof v === 'undefined' || v === null) {
      return null;
    }
    return f(v, eMsg);
  };
}

export {
  isUndefNull, undefNullable
};
