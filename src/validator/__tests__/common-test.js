/* @flow
*
*/

jest.unmock('../common.js');
jest.unmock('../../utils/tools.js');

import { mustBe, mustNot} from '../common.js';
import { format } from '../../utils/tools.js';

export class TmpError extends Error {
}
export class Tmp2Error extends Error {
}
//console.log( new TmpError('1') instanceof TmpError);

describe('test mustBe()', () => {
  // ToDo: deep equal ?
  it('will return the value when it is equal to shouldBe', () => {
    expect( mustBe('hehe', 'hehe') )
      .toEqual('hehe');
  });
  it('will throw when shouldBe != value', function() {
    const shouldBe = 1; const value = 2;
    expect(() => {
      mustBe(shouldBe, value);
    }).toThrowError(new
      Error(`value(${format(value)}) shoulde be (${format(shouldBe)})`));
  });
  it('can throw cusomize Error', () => {
    const customE = new TmpError('custom e');
    expect( () => {
      mustBe(1, 2, customE);
    }).toThrowError( 'custom e');
  });
  it('can throw cusomize string(wraped as an Error inner)', () => {
    expect( () => {
      mustBe(1, 2, 'something');
    }).toThrowError(new Error('something'));
  });
});


describe('test mustNot()', () => {
  // ToDo: deep equal ?
  it('will return the value when it is not notBe', () => {
    expect( mustNot('hehe', 'some') )
      .toEqual('some');
  });
  it('will throw when value == notBe', function() {
    const notBe = 1; const value = 1;
    expect(() => {
      mustNot(notBe, value);
    }).toThrowError(new
      Error(`value(${format(value)}) most not be (${format(notBe)})`));
  });
  it('can throw cusomize Error', () => {
    const customE = new TmpError('custom e');
    expect( () => {
      mustNot(1, 1, customE);
    }).toThrowError(customE);
  });
  it('can throw cusomize string(wraped as an Error inner)', () => {
    expect( () => {
      mustNot(1, 1, 'something');
    }).toThrowError(new Error('something'));
  });
});
