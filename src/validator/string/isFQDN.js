/* @flow
 *
 */

import {isString} from './string.js';
import {RunTimeCheckE} from '../../definition/def.js';
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

export default function isFDQN(_mix_str:mixed, options:FQDN_OPTIONS):string {
  const _str = isString(_mix_str);
  let str = _str;
  options = merge(options, default_fqdn_options);

    /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  const parts = str.split('.');
  if (options.require_tld) {
    const tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      throw new RunTimeCheckE(`(${str}) is not FDQN`);
    }
  }
  for (let part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      throw new RunTimeCheckE(`(${str}) is not FDQN`);
    }
    if (/[\uff01-\uff5e]/.test(part)) {
          // disallow full-width chars
      throw new RunTimeCheckE(`(${str}) is not FDQN`);
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      throw new RunTimeCheckE(`(${str}) is not FDQN`);
    }
  }
  return _str;
}
