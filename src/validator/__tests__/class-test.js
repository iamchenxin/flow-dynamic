/* @flow
*
*/

jest.unmock('../class.js');
jest.unmock('../../definition/def.js');

import {isInstanceof} from '../class.js';
import {RunTimeCheckE, ePrint} from '../../definition/def.js';

class A {
  v:string;
  constructor() {
    this.v = 'test';
  }
}
class B {
  v:string;
  constructor() {
    this.v = 'test';
  }
}
describe('test isInstanceof()', () => {

  it('will return the value itself when it is the right instance', function() {
    let a:mixed = new A();
    expect(isInstanceof(a, A)).toEqual(a);
  });

  it('will throw when value is not a instance of given class', function() {
    const a:mixed = 'test';
    expect(() => {
      isInstanceof(a, A);
    }).toThrow(new RunTimeCheckE(
      `value:(${ePrint(a)}) should be instanceof A`));

    const b = new B();
    expect(() => {
      isInstanceof(b, A);
    }).toThrow(new RunTimeCheckE(
      `value:(${ePrint(b)}) should be instanceof A`));
  });

  it('will throw when the type arg is not a class', () => {
    const a:mixed = new A();
    const typeArg = {v:'test'};
    expect(() => {
      isInstanceof(a, typeArg);
    }).toThrow(new RunTimeCheckE(
      `The Type(${ePrint(typeArg)}) you passed in is not a class!`));
  });

});
