/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';

export function isInstanceof<Type>(v:mixed, _class:Class<Type>,
eMsg: ?string):Type {
  if ( typeof _class !== 'function' ) {
    const msg = eMsg?eMsg
      : `The Type(${ePrint(_class)}) you passed in is not a class!`;
    throw new RunTimeCheckE(msg);
  }
  if ( v instanceof _class) {
    return v;
  } else {
    const msg = eMsg?eMsg
      : `value:(${ePrint(v)}) should be instanceof ${_class.name}`;
    throw new RunTimeCheckE(msg);
  }
}
