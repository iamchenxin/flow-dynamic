/* @flow
*
*/

jest.unmock('../isEmail.js');
jest.unmock('../../../definition/def.js');

import {isEmail} from '../isEmail.js';
import {RunTimeCheckE, ePrint} from '../../../definition/def.js';

describe('test isEmail()', () => {
  it('will throw when value is not a email', function() {
    const v:mixed = 'iamche@xxx';
    expect(() => {
      isEmail(v);
    }).toThrow(new RunTimeCheckE(`value(${ePrint(v)}) is not a email.`));
  });

  it('will return the value itself when it is a string', function() {
    let v = 'iamche@gmail.com';
    expect(isEmail(v)).toEqual(v);
    v = 'iamche@163.com';
    expect(isEmail(v)).toEqual(v);
    v = 'iamche@x.cc';
    expect(isEmail(v)).toEqual(v);
  });
});
