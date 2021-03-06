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
    if (Array.isArray(v)) {
      throw new RunTimeCheckE(`value:(${ePrint(v)}) is a Array ` +
      'not a Object.(This is stricted by Flow!)');
    }
    const ob:Object = v;
    return ob;
  }
  throw new RunTimeCheckE(`value:(${ePrint(v)}) is not a Object.`);
}

isObject.isStringMap = isStringMap;
isObject.isNumberMap = isNumberMap;
isObject.isMapOf = isMapOf;

const dev = {
  isObject:(v:any):any => v
};
dev.isObject.isMapOf = omDev.isMapOf;
dev.isObject.isStringMap = omDev.isStringMap;
dev.isObject.isNumberMap = omDev.isNumberMap;


export {
  isObject,
  dev
};
