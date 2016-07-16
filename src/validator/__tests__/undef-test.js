/* @flow
*
*/

jest.unmock('../undef.js');
jest.unmock('../../definition/def.js');
jest.unmock('../string/string.js');

import {isUndef, undefable} from '../undef.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isString } from '../string/string.js';

describe('test isUndef()', () => {
  it('will throw when value !== undefined', function() {
    const v:mixed = null;
    expect(() => {
      isUndef(v);
    }).toThrow(new RunTimeCheckE('This field should be undefined.'));
  });

  it('will return undefined when the value is undefined', function() {
    let v:mixed = undefined;
    expect(isUndef(v)).toEqual(undefined);
  });
});

describe('test undefable()', () => {
  describe('undefable(isString) will return a Function ' +
  'undefableString(v:mixed)=>void|string', () => {
    const undefableString = undefable(isString);
    it('undefableString will return undefined when the value is undefined',
    function() {
      let v:mixed = undefined;
      expect(undefableString(v)).toEqual(undefined);
    });

    it('undefableString will return the value itself,when it is string',
    function() {
      let v:mixed = 'aaa';
      expect(undefableString(v)).toEqual(v);
    });

    it('undefableString will throw when value is not void|string', function() {
      const v:mixed = null;
      expect(() => {
        undefableString(v);
      }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) should be string.`));
    });
  });

  describe('undefableFn will transfer eMsg to downstream ', () => {
    const undefableString = undefable(isString);
    it('test with isString', () => {
      const v:mixed = null;
      expect(() => {
        undefableString(v, 'Must be String');
      }).toThrow(new RunTimeCheckE('Must be String'));
    });
  });
});
