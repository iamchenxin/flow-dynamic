/* @flow
 *
 */

import {isString} from './string.js';
import {RunTimeCheckE} from '../../definition/def.js';

const notBase64 = /[^A-Z0-9+\/=]/i;

export default function isBase64(_mix_str:mixed):string {
  const str = isString(_mix_str);
  const len = str.length;
  if (!len || len % 4 !== 0 || notBase64.test(str)) {
    throw new RunTimeCheckE(`(${str}) is not Base64`);
  }
  const firstPaddingChar = str.indexOf('=');
  const stat = firstPaddingChar === -1 ||
    firstPaddingChar === len - 1 ||
    (firstPaddingChar === len - 2 && str[len - 1] === '=');
  if (stat) {
    return str;
  } else {
    throw new RunTimeCheckE(`(${str}) is not Base64`);
  }
}
