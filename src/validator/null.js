/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';
import type {TypeCaster} from '../definition/def.js';

function isNull(v:mixed):null {
  if (v === null) {
    return null;
  }
  throw new RunTimeCheckE(`value:(${ePrint(v)}) should be null.`);
}

type NullableCaster<T> = (v:any, eMsg?: string) => ?T;
function nullable<T>(f: TypeCaster<T>): NullableCaster<T> {
  return function(v:mixed, eMsg?: string):?T {
    if (v===null) {return null;}
    return f(v, eMsg);
  };
}

export {
  isNull, nullable
};
