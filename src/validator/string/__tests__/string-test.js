/* @flow
*
*/

jest.unmock('../string.js');
jest.unmock('../../../definition/def.js');

import {isString} from '../string.js';
import {RunTimeCheckE, ePrint} from '../../../definition/def.js';

describe('test isString()', () => {
  it('will throw when value is not a string', function() {
    const v:mixed = 123;
    expect(() => {
      isString(v);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) should be string.`));
  });

  it('will return the value itself when it is a string', function() {
    let v:mixed = '123';
    expect(isString(v)).toEqual(v);
  });
});
