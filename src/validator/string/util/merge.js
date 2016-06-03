/* @flow
 *
 */

export default function merge(obj:Object = { }, defaults:Object):Object {
  for (const key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
