/* @flow
*
*/

jest.unmock('../number.js');
jest.unmock('../../../definition/def.js');

import {testRange} from '../helper.js';
//import {RunTimeCheckE, ePrint} from '../../../definition/def.js';

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

  it('treat min:0,max:0 as a number,not false', () => {
    const range = {min:0, max:3, intervals:'(]'};
    expect(testRange(-10, range)).toEqual(false);
    expect(testRange(-0, range)).toEqual(false);
    expect(testRange(1, range)).toEqual(true);
    const range2 = {min:-7, max:0, intervals:'(]'};
    expect(testRange(1, range2)).toEqual(false);
    expect(testRange(-0, range2)).toEqual(true);
    expect(testRange(-6, range2)).toEqual(true);
  });
});
