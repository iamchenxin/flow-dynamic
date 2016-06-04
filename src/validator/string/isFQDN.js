/* @flow
 *
 */

import {isString} from './string.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import merge from './util/merge';

type FQDN_OPTIONS = {
  require_tld: boolean,
  allow_underscores: boolean,
  allow_trailing_dot: boolean,
};
const default_fqdn_options:FQDN_OPTIONS = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
};

function isFDQN(_str:string, options:FQDN_OPTIONS):string {
  const str = isString(_str);
  if ( testFDQN(str, options) ) {
    return str;
  }
  throw new RunTimeCheckE(`value(${ePrint(_str)}) is not FDQN.`);
}

function testFDQN(str:string, options:FQDN_OPTIONS):boolean {
  options = merge(options, default_fqdn_options);

    /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  const parts = str.split('.');
  if (options.require_tld) {
    const tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
  }
  for (let part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    if (/[\uff01-\uff5e]/.test(part)) {
          // disallow full-width chars
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}

export {
  isFDQN,
  testFDQN
};
