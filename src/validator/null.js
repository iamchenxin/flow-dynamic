/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';
import type {TypeCaster} from '../definition/def.js';

function isNull(v:mixed, eMsg?: string):null {
  if (v === null) {
    return null;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) should be null.`;
  throw new RunTimeCheckE(msg);
}

// This maybe useless, cause `: ?T` is maybe type , ?: T is void type.
// There is no quick represention for nullable type in Flow
type NullableCaster<T> = (v:any, eMsg?: string) => null|T;
function nullable<T>(f: TypeCaster<T>): NullableCaster<T> {
  return function(v:mixed, eMsg?: string): null|T {
    if (v===null) {return null;}
    return f(v, eMsg);
  };
}

export {
  isNull, nullable
};
