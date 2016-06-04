/* @flow
 *
 */

import {isString} from './string.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';

type OPTIONS = {
  min?:number,
  max?:number
};
/* eslint-disable prefer-rest-params */
function isByteLength(_mix_str:mixed, options:OPTIONS):string {
  const str = isString(_mix_str);
  if ( byteLength(str, options) ) {
    return str;
  } else {
    throw new RunTimeCheckE(`(${str}).length not in range ${ePrint(options)}`);
  }
}

function byteLength(str:string, options:OPTIONS):boolean {
  const min = options.min?options.min:0;
  const max = options.max;
  const len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

export {
  isByteLength,
  byteLength
};
