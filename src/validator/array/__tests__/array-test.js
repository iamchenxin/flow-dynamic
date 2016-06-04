/* @flow
*
*/

jest.unmock('../array.js');
jest.unmock('../../../definition/def.js');

import {isArray} from '../array.js';
import {RunTimeCheckE, ePrint} from '../../../definition/def.js';

describe('test isArray()', () => {
  it('will throw when value is not a Array', function() {
    const v = {0:'1', 1:'22', 2:'aaa'};
    expect(() => {
      isArray(v);
    }).toThrow(new RunTimeCheckE(`value:(${ePrint(v)}) is not a Array.`));
  });

  it('will return the passed in value when its a Array', function() {
    const v = [1, 2, 'a', 'bbb'];
    const rt:mixed[] = isArray(v);
    expect(rt).toEqual(v);
  });
});
