/* @flow
 *
 */
import {isString} from './string.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import merge from './util/merge';
import {byteLength} from './isByteLength';
import {testFDQN} from './isFQDN';

type EMAIL_OPTIONS = {
  allow_display_name?: boolean,
  allow_utf8_local_part?: boolean,
  require_tld?: boolean,
};
const default_email_options:EMAIL_OPTIONS = {
  allow_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
const displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
const emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
const quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
const emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
const quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(_str:string, options?:EMAIL_OPTIONS):string {
  const oristr = isString(_str);
  let str:string = oristr;
  options = merge(options, default_email_options);

  if (options.allow_display_name) {
    const display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    }
  }

  const parts = str.split('@');
  const domain = parts.pop();
  let user = parts.join('@');

  const lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!byteLength(user, { max: 64 }) ||
            !byteLength(domain, { max: 256 })) {
    throw new RunTimeCheckE(`value(${ePrint(_str)}) is not a email.`);
  }

  if (!testFDQN(domain, { require_tld: options.require_tld })) {
    throw new RunTimeCheckE(`value(${ePrint(_str)}) is not a email.`);
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    const stat = options.allow_utf8_local_part ?
            quotedEmailUserUtf8.test(user) :
            quotedEmailUser.test(user);
    if ( stat ) {
      return oristr;
    } else {
      throw new RunTimeCheckE(`value(${ePrint(_str)}) is not a email.`);
    }
  }

  const pattern = options.allow_utf8_local_part ?
        emailUserUtf8Part : emailUserPart;

  const user_parts = user.split('.');
  for (let i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      throw new RunTimeCheckE(`value(${ePrint(_str)}) is not a email.`);
    }
  }

  return oristr;
}

const _copy = (v:any, op:any) => v;
const dev = {
  isEmail:_copy
};

export {
  isEmail,
  dev
};
