/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';

export function isInstanceof<Type>(v:mixed, _class:Class<Type>):Type {
  if ( typeof _class !== 'function' ) {
    throw new RunTimeCheckE(
      `The Type(${ePrint(_class)}) you passed in is not a class!`);
  }
  if ( v instanceof _class) {
    return v;
  } else {
    throw new RunTimeCheckE(
      `value:(${ePrint(v)}) should be instanceof ${_class.name}`);
  }
}
