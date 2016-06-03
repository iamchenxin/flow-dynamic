/* @flow
*
*/

jest.unmock('../int.js');
jest.unmock('../../../definition/def.js');

import {isInt, cvt} from '../int.js';
const clip = cvt.clip;
import {RunTimeCheckE, ePrint} from '../../../definition/def.js';

describe('test isInt()', () => {
  it('will throw when value is not a integer', function() {
    const v:mixed = 123.1;
    expect(() => {
      isInt(v);
    }).toThrow(new RunTimeCheckE(`value(${ePrint(v)}) is not a integer`));
  });

  it('will return the value itself when it is a integer', function() {
    let v:mixed = 123;
    expect(isInt(v)).toEqual(v);
  });
});

describe('test clip()', () => {
  it('will throw when value is not a int', function() {
    const v:mixed = 123.1;
    expect(() => {
      clip(v, null, 1);
    }).toThrow(new RunTimeCheckE(`value(${ePrint(v)}) is not a integer`));
  });

  it('will throw when default value is not a int', function() {
    const v:mixed = 123;
    const _default:number = 0.1;
    expect(() => {
      clip(v, null, _default);
    }).toThrow(new RunTimeCheckE(`The _default(${_default}) ` +
    'passed in to clip() is not a integer'));
  });

  it('will return the value itself when it is in Range', function() {
    let v:mixed = 123;
    expect(clip(v, {min:0, max:124, intervals:'[]'}, 0)).toEqual(v);
  });

  it('will return the default when it is not in Range', function() {
    let v:mixed = 125;
    expect(clip(v, {min:0, max:124, intervals:'[]'}, 0)).toEqual(0);
  });

  it('represent a positive by a half open intervals', function() {
    let v:mixed = 2;
    expect(clip(v, {min:0, intervals:'(]'}, 1)).toEqual(v);
  });
});
