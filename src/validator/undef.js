/* @flow
*
*/
import {RunTimeCheckE} from '../definition/def.js';
import type {TypeCaster} from '../definition/def.js';

function isUndef(v:mixed, eMsg?: string):void {
  if (typeof v === 'undefined') {
    return undefined;
  }
  const msg = eMsg?eMsg:'This field should be undefined.';
  throw new RunTimeCheckE(msg);
}

type UndefableCaster<T> = (v:any, eMsg?: string) => void|T;
function undefable<T>(f: TypeCaster<T>): UndefableCaster<T> {
  return function(v:mixed, eMsg?: string):void|T {
    if (typeof v === 'undefined') {return undefined;}
    return f(v, eMsg);
  };
}

export {
  isUndef, undefable
};
