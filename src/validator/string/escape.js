/* @flow
 *
 */
import {isString } from './string.js';

export default function escape(str:mixed):string {
  const v = isString(str);
  return (v.replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\//g, '&#x2F;')
        .replace(/\`/g, '&#96;'));
}
