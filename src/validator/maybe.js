/* @flow
 * Maybe Type https://flowtype.org/docs/nullable-types.html#_
 * Its different from Null .
 * A Maybe Type is a null|void|T
**/

import {RunTimeCheckE, ePrint} from '../definition/def.js';
import type {TypeCaster} from '../definition/def.js';

function isMaybe(v: mixed, eMsg?: string): null|void {
  if (v == null) { // == null is null or undefined
    return v;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) should be null|void.`;
  throw new RunTimeCheckE(msg);
}

type MaybeCaster<T> = (v:any, eMsg?: string) => null|void|T;

function maybe<T>(f: TypeCaster<T>): MaybeCaster<T> {
  return function(v:mixed, eMsg?: string): ?T {
    if ( v == null) {
      return v;
    }
    return f(v, eMsg);
  };
}

export {
  isMaybe,
  maybe
};
