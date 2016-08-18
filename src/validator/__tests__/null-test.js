/* @flow
*
*/

jest.unmock('../null.js');
jest.unmock('../../definition/def.js');
jest.unmock('../string/string.js');

import {isNull, nullable} from '../null.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isString } from '../string/string.js';

describe('test isNull()', () => {
  it('will throw when value !== null', function() {
    const v:mixed = undefined;
    expect(() => {
      isNull(v);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) should be null.`));
  });

  it('will return null when the value is null', function() {
    let v:mixed = null;
    expect(isNull(v)).toEqual(null);
  });
});

describe('test nullable()', () => {
  describe('nullable(isString) will return a Function ' +
  'nullableString(v:mixed)=>null|string', () => {
    const nullableString = nullable(isString);
    it('nullableString will return null when the value is null',
    function() {
      let v:mixed = null;
      expect(nullableString(v)).toEqual(null);
    });

    it('nullableString will return the value itself,when it is string',
    function() {
      let v:mixed = 'aaa';
      expect(nullableString(v)).toEqual(v);
    });

    it('nullableString will throw when value is not null|string', function() {
      const v:mixed = 1;
      expect(() => {
        nullableString(v);
      }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) should be string.`));
    });

    it('nullableString will pass though custom eMsg', function() {
      const v:mixed = 1;
      expect(() => {
        nullableString(v, 'something');
      }).toThrow(new RunTimeCheckE('something'));
    });
  });
});
