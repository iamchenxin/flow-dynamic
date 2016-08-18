/* @flow
*
*/

jest.unmock('../maybe.js');
jest.unmock('../../definition/def.js');
jest.unmock('../string/string.js');

import {isMaybe, maybe} from '../maybe.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {isString } from '../string/string.js';

describe('test isMaybe()', () => {
  it('will throw when value != null', function() {
    const v:mixed = 1;
    expect(() => {
      isMaybe(v);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) should be null|void.`));
  });

  it('will return null when the value is null', function() {
    let v:mixed = null;
    expect(isMaybe(v)).toEqual(null);
  });

  it('will return undefined when the value is null', function() {
    let v:mixed = undefined;
    expect(isMaybe(v)).toEqual(undefined);
  });
});

describe('test maybe()', () => {
  describe('maybe(isString) will return a Function ' +
  'maybeString(v:mixed)=>?string', () => {
    const maybeString = maybe(isString);
    it('nullableString will return null when the value is null',
    function() {
      let v:mixed = null;
      expect(maybeString(v)).toEqual(null);
    });

    it('nullableString will return undefined when the value is null',
    function() {
      let v:mixed = undefined;
      expect(maybeString(v)).toEqual(undefined);
    });

    it('nullableString will return the value itself,when it is string',
    function() {
      let v:mixed = 'aaa';
      expect(maybeString(v)).toEqual(v);
    });

    it('nullableString will throw when value is not void|null|string',
    function() {
      const v:mixed = 1;
      expect(() => {
        maybeString(v);
      }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) should be string.`));
    });

    it('nullableString will pass though custom eMsg', function() {
      const v:mixed = 1;
      expect(() => {
        maybeString(v, 'something');
      }).toThrow(new RunTimeCheckE('something'));
    });
  });
});
