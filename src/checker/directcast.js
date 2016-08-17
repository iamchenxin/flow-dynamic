/* @flow
 *
 * direct cast
**/

//import {RunTimeCheckE, ePrint} from '../definition/def.js';
import type { TypeCaster} from '../definition/def.js';

function cast<DstType>(
  unCheckValue:any,
  caster:TypeCaster<DstType>
): DstType {
  return caster(unCheckValue);
}

const pro = {
  cast,
};

const dev = { //should not use dev = pro,thats a ref
  cast,
};
// if no dev, just return the unCheckValue,do not check.
if (process.env.NODE_ENV != 'dev') {
  dev.cast = function(unCheckValue:any) {
    return unCheckValue;
  };
}

export {
  pro,
  dev,
};
