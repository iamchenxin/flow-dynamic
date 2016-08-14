/* @flow
*
*/

jest.unmock('../undefnull.js');
jest.unmock('../../definition/def.js');
jest.unmock('../string/string.js');

import {isUndefNull, undefNullable} from '../undefnull.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isString } from '../string/string.js';

describe('test isUndefNull()', () => {
  it('will throw when value !== null|void', function() {
    const v:mixed = 1;
    expect(() => {
      isUndefNull(v);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) should be null|void.`));
  });

  it('will return null when the value is null', function() {
    let v:mixed = null;
    expect(isUndefNull(v)).toEqual(null);
  });

  it('will return null when the value is undefined', function() {
    let v:mixed = undefined;
    expect(isUndefNull(v)).toEqual(null);
  });
});

describe('test undefNullable()', () => {
  describe('undefNullable(isString) will return a Function ' +
  'undefNullString(v:mixed)=>?string', () => {
    const undefNullString = undefNullable(isString);
    it('undefNullString will return null when the value is null',
    function() {
      let v:mixed = null;
      expect(undefNullString(v)).toEqual(null);
    });

    it('undefNullString will return null when the value is undefined',
    function() {
      let v:mixed = undefined;
      expect(undefNullString(v)).toEqual(null);
    });

    it('undefNullString will return the value itself,when it is string',
    function() {
      let v:mixed = 'aaa';
      expect(undefNullString(v)).toEqual(v);
    });

    it('undefNullString will throw when value is not null|void|string', () => {
      const v:mixed = 1;
      expect(() => {
        undefNullString(v);
      }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) should be string.`));
    });

    it('undefNullString will pass though custom eMsg', function() {
      const v:mixed = 1;
      expect(() => {
        undefNullString(v, 'something');
      }).toThrow(new RunTimeCheckE('something'));
    });
  });
});
