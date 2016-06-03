/* @flow
*
*/
import {RunTimeCheckE} from '../definition/def.js';

function isUndef(v:mixed):void {
  if (typeof v === 'undefined') {
    return undefined;
  }
  throw new RunTimeCheckE('This field should be undefined.');
}

function undefable<T>(f:(fv:mixed)=>T):(nv:mixed)=>void|T {
  return function(v:mixed):void|T {
    if (typeof v === 'undefined') {return undefined;}
    return f(v);
  };
}

export {
  isUndef, undefable
};
