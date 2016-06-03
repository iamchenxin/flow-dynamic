/* @flow
*
*/

jest.unmock('../number.js');
jest.unmock('../../../definition/def.js');

import {isNumber, testRange, cvt} from '../number.js';
import {RunTimeCheckE, ePrint} from '../../../definition/def.js';
const clip = cvt.clip;
describe('test isNumber()', () => {
  it('will throw when value is not a number', function() {
    const v:mixed = '123';
    expect(() => {
      isNumber(v);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) is not a number.`));
  });

  it('will return the value itself when it is a number', function() {
    let v:mixed = 123;
    expect(isNumber(v)).toEqual(v);
  });
});

describe('test testRange()', () => {
  it('[] is closed interval', () => {
    const range = {min:1, max:3, intervals:'[]'};
    expect(testRange(0, range)).toEqual(false);
    expect(testRange(1, range)).toEqual(true);
    expect(testRange(2.1, range)).toEqual(true);
    expect(testRange(3, range)).toEqual(true);
  });

  it('[) is closed-open interval', () => {
    const range = {min:1, max:3, intervals:'[)'};
    expect(testRange(0, range)).toEqual(false);
    expect(testRange(1, range)).toEqual(true);
    expect(testRange(2.1, range)).toEqual(true);
    expect(testRange(3, range)).toEqual(false);
  });

  it('(] is open-closed interval', () => {
    const range = {min:1, max:3, intervals:'(]'};
    expect(testRange(0, range)).toEqual(false);
    expect(testRange(1, range)).toEqual(false);
    expect(testRange(2.1, range)).toEqual(true);
    expect(testRange(3, range)).toEqual(true);
  });

  it('() is open interval', () => {
    const range = {min:1, max:3, intervals:'()'};
    expect(testRange(0, range)).toEqual(false);
    expect(testRange(1, range)).toEqual(false);
    expect(testRange(2.1, range)).toEqual(true);
    expect(testRange(3, range)).toEqual(false);
  });

});


describe('test clip()', () => {
  it('will throw when value is not a number', function() {
    const v:mixed = '123';
    expect(() => {
      clip(v, null, 1);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) is not a number.`));
  });

  it('will throw when default value is not a number', function() {
    const v:mixed = 123;
    const _default:number = '0.1';
    expect(() => {
      clip(v, null, _default);
    }).toThrow(new RunTimeCheckE(`The _default(${_default}) ` +
    'passed in to clip() is not a number'));
  });

  it('will return the value itself when it is in Range', function() {
    let v:mixed = 123.1;
    expect(clip(v, {min:0, max:124, intervals:'[]'}, 0)).toEqual(v);
  });

  it('will return the default when it is not in Range', function() {
    let v:mixed = 125;
    expect(clip(v, {min:0, max:124, intervals:'[]'}, 0)).toEqual(0);
  });

  it('represent a positive by a half open intervals', function() {
    let v:mixed = 0.1;
    expect(clip(v, {min:0, intervals:'(]'}, 1)).toEqual(v);
  });
});
