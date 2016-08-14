/* @flow
*
*/

jest.unmock('../boolean.js');
jest.unmock('../../definition/def.js');

import {isBoolean} from '../boolean.js';
import {RunTimeCheckE} from '../../definition/def.js';

describe('test isBoolean()', () => {
  it('will throw when value !== boolean', function() {
    const v:mixed = null;
    expect(() => {
      isBoolean(v);
    }).toThrow(new RunTimeCheckE(`value:(${v}) should be boolean.`));
  });

  it('will return the value itself when it is a boolean', function() {
    let v:mixed = true;
    expect(isBoolean(v)).toEqual(v);
    v = false;
    expect(isBoolean(v)).toEqual(v);
  });

  it('will pass though custom eMsg', function() {
    const v:mixed = null;
    expect(() => {
      isBoolean(v, 'something');
    }).toThrow(new RunTimeCheckE('something'));
  });
});
