/* @flow
 *
 * Note: $Enum and $Keys just aliases for the same thing.
 * https://github.com/facebook/flow/blob/master/src/typing/type_annotation.ml#L246
 * but $Enum will remove in future Flow version.
 * Not sure if need to rename this to isKeys, but isEnum looks like a good name.
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';
//import type {TypeCaster} from '../definition/def.js';

function isEnum<EnumObj: Object>(v: any, enumObj: EnumObj,
eMsg?: string): $Keys<EnumObj> {
  if ( enumObj.hasOwnProperty(v) ) {
    return (v);
  }
  const msg = eMsg?eMsg:` value:(${ePrint(v)}) is not a key of ` +
  `${ePrint(Object.keys(enumObj))}`;
  throw new RunTimeCheckE(msg);
}

export {
  isEnum
};
