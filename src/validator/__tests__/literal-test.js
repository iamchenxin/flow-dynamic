/* @flow
*
*/

jest.unmock('../literal.js');
jest.unmock('../../definition/def.js');

import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {
  isLiteral
} from '../literal.js';
const isLiteral2 = isLiteral.T2;
const isLiteral3 = isLiteral.T3;
const isLiteral4 = isLiteral.T4;
const isLiteral5 = isLiteral.T5;

describe('test isLiteral()', () => {

  it('will return the value itself when it is a given literal', function() {
    let v = 'Tom';
    expect(isLiteral(v, 'Tom')).toEqual(v);
  });

  it('will throw when value is not a given litera', function() {
    let v = 'tom';
    const msg = `value:(${ePrint(v)}) is not` +
    ` a literal(${ePrint('Tom')}).`;
    expect(() => {
      isLiteral(v, 'Tom');
    }).toThrow(new RunTimeCheckE(msg));
  });

});

describe('test isLiteral2()', () => {

  it('will return the value itself when it is a given literal', function() {
    let v = 'Tom';
    expect(isLiteral2(v, 'Tom', 'Jim')).toEqual(v);
  });

  it('will throw when value is not a given litera', function() {
    let v = 'tom';
    const msg = `value:(${ePrint(v)}) is not` +
    ` a literal( ${ePrint('Tom')} | ${ePrint('Jim')} ).`;
    expect(() => {
      isLiteral2(v, 'Tom', 'Jim');
    }).toThrow(new RunTimeCheckE(msg));
  });
});

describe('test isLiteral3()', () => {

  it('will return the value itself when it is a given literal', function() {
    let v = 'Tom';
    expect(isLiteral3(v, 'Tom', 'Jim', 'Paul')).toEqual(v);
  });

  it('will throw when value is not a given litera', function() {
    let v = 'tom';
    const msg = `value:(${ePrint(v)}) is not` +
    ` a literal( ${ePrint('Tom')} | ${ePrint('Jim')} | ${ePrint('Paul')} ).`;
    expect(() => {
      isLiteral3(v, 'Tom', 'Jim', 'Paul');
    }).toThrow(new RunTimeCheckE(msg));
  });
});

describe('test isLiteral4()', () => {

  it('will return the value itself when it is a given literal', function() {
    let v = 'Tom';
    expect(isLiteral4(v, 'Tom', 'Jim', 'Paul', 'Mark')).toEqual(v);
  });

  it('will throw when value is not a given litera', function() {
    let v = 'tom';
    const msg = `value:(${ePrint(v)}) is not` +
    ` a literal( ${ePrint('Tom')} | ${ePrint('Jim')} | ${ePrint('Paul')}` +
    ` | ${ePrint('Mark')} ).`;
    expect(() => {
      isLiteral4(v, 'Tom', 'Jim', 'Paul', 'Mark');
    }).toThrow(new RunTimeCheckE(msg));
  });
});

describe('test isLiteral5()', () => {

  it('will return the value itself when it is a given literal', function() {
    let v = 'Tom';
    expect(isLiteral5(v, 'Tom', 'Jim', 'Paul', 'Mark', 'John')).toEqual(v);
  });

  it('will throw when value is not a given litera', function() {
    let v = 'tom';
    const msg = `value:(${ePrint(v)}) is not` +
    ` a literal( ${ePrint('Tom')} | ${ePrint('Jim')} | ${ePrint('Paul')}` +
    ` | ${ePrint('Mark')} | ${ePrint('John')} ).`;
    expect(() => {
      isLiteral5(v, 'Tom', 'Jim', 'Paul', 'Mark', 'John');
    }).toThrow(new RunTimeCheckE(msg));
  });
});
