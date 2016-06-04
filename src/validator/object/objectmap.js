/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isObject} from './object.js';

function isStringMap(_v:any):{[key:string]:string} {
  const v = isObject(v);
  for (var key in v) {
    if ( typeof v[key] !== 'string') {
      throw new RunTimeCheckE(`This Object:\n${ePrint(v)}\n` +
      'is not a {[key:string]:string}');
    }
  }
  return v;
}

function isNumberMap(_v:any):{[key:string]:number} {
  const v = isObject(v);
  for (var key in v) {
    if ( typeof v[key] !== 'number') {
      throw new RunTimeCheckE(`This Object:\n${ePrint(v)}\n` +
      'is not a {[key:string]:number}');
    }
  }
  return v;
}

function isMapOf<T>(_v:any, _class:Class<T>):{[key:string]:number} {
  const v = isObject(v);
  for (var key in v) {
    if ( (v[key] instanceof _class) !== true ) {
      throw new RunTimeCheckE(`This Object:\n${ePrint(v)}\n` +
      'is not a map of given class');
    }
  }
  return v;
}

const dev = {
  isStringMap: (v:any)=>v,
  isNumberMap: (v:any)=>v,
  isMapOf: (v:any, c:any)=>v,
};
export {
  isStringMap,
  isNumberMap,
  isMapOf,
  dev
};
