/* @flow
*
*/

jest.unmock('../float.js');
jest.unmock('../../../definition/def.js');

import {isFloat, cvt} from '../float.js';
const clip = cvt.clip;
import {RunTimeCheckE, ePrint} from '../../../definition/def.js';

describe('test isFloat()', () => {
  it('will throw when value is not a float', function() {
    const v:mixed = 123;
    expect(() => {
      isFloat(v);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) is not a float`));
  });

  it('will return the value itself when it is a float', function() {
    let v:mixed = 123.1;
    expect(isFloat(v)).toEqual(v);
  });
});

describe('test clip()', () => {
  it('will throw when value is not a float', function() {
    const v:mixed = 123;
    expect(() => {
      clip(v, null, 0.1);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) is not a float`));
  });

  it('will throw when default value is not a float', function() {
    const v:mixed = 123.1;
    const _default:number = 1;
    expect(() => {
      clip(v, null, _default);
    }).toThrow(new RunTimeCheckE(`The _default(${_default}) ` +
    'passed in to clip() is not a float'));
  });

  it('will return the value itself when it is in Range', function() {
    let v:mixed = 123.1;
    expect(clip(v, {min:0, max:124, intervals:'[]'}, 0.1)).toEqual(v);
  });

  it('will return the default when it is not in Range', function() {
    let v:mixed = 125.1;
    expect(clip(v, {min:0, max:124, intervals:'[]'}, 0.1)).toEqual(0.1);
  });

  it('represent a positive by a half open intervals', function() {
    let v:mixed = 0.1;
    expect(clip(v, {min:0, intervals:'(]'}, 0.1)).toEqual(v);
  });
});
