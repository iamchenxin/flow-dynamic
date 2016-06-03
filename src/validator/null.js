/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';

function isNull(v:mixed):null {
  if (v === null) {
    return null;
  }
  throw new RunTimeCheckE(`value:(${ePrint(v)}) should be null.`);
}

function nullable<T>(f:(fv:mixed)=>T):(nv:mixed)=>?T {
  return function(v:mixed):?T {
    if (v===null) {return null;}
    return f(v);
  };
}

export {
  isNull, nullable
};
