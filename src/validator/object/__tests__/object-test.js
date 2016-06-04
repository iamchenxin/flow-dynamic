/* @flow
*
*/

jest.unmock('../object.js');
jest.unmock('../../../definition/def.js');

import {isObject} from '../object.js';
import {RunTimeCheckE, ePrint} from '../../../definition/def.js';

describe('test isObject()', () => {

  it('will return the passed in value when its a Object', function() {
    const v = {0:'1', 1:'22', 2:'aaa'};
    const rt = isObject(v);
    expect(rt).toEqual(v);
  });

  it('will throw when value is not a Object', function() {
    const v = 'ssss';
    expect(() => {
      isObject(v);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) is not a Object.`));
  });

  it('will throw when value is a Array.(Stricted by Flow)', function() {
    const v = [1, 2, 'a', 'bbb'];
    expect(() => {
      isObject(v);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) is a Array ` +
    'not a Object.(This is stricted by Flow!)'));
  });

});
