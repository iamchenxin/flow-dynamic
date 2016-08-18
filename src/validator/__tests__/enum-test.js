/* @flow
*
*/

jest.unmock('../literal.js');
jest.unmock('../../definition/def.js');

import { RunTimeCheckE, ePrint } from '../../definition/def.js';
import { isEnum } from '../enum.js';

describe('test isEnum()', () => {
  const em = {
    aaa:'aaa',
    bbb:'bbb',
    ccc:'ccc'
  };
//  type EM_KEYS = $Keys<typeof em>;

  it('it will return the value itself when its a key of enum', () => {
    const d = 'aaa';
    expect(isEnum(d, em)).toEqual(d);
  });

  it('will throw,when it is not a key of enum', () => {
    const d = 'aa';
    const eMsg = ` value:(${ePrint(d)}) is not a key of ` +
    `${ePrint(Object.keys(em))}`;
    expect( () => {
      isEnum(d, em);
    }).toThrowError(RunTimeCheckE, eMsg);
  });

});
