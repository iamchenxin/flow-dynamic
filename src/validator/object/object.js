/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {
  isStringMap,
  isNumberMap,
  isMapOf,
  dev as omDev
} from './objectmap.js';

function isObject(v:mixed):Object {
  if (v instanceof Object) {
    return v;
  }
  throw new RunTimeCheckE(`value:(${ePrint(v)}) is not a Object.`);
}

isObject.isStringMap = isStringMap;
isObject.isNumberMap = isNumberMap;
isObject.isMapOf = isMapOf;

const dev = {
  isObject:(v:any) => v
};
dev.isObject.isMapOf = omDev.isMapOf;
dev.isObject.isStringMap = omDev.isStringMap;
dev.isObject.isNumberMap = omDev.isNumberMap;


export {
  isObject,
  dev
};
