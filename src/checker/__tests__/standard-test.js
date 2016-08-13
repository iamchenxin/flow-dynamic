/* @flow
*
*/

jest.unmock('../standard.js');
jest.unmock('../../definition/def.js');
jest.unmock('../../validator/index.js');

import {
  pro as std
} from '../standard.js';
const {check1} = std;
import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {
  pro,
} from '../../validator/index.js';


describe('test check1()', () => {
  function someFn(yourFn) {
    return check1(arg1 => ({
      id: pro.isString(arg1.id)
    }), yourFn);
  }

  it('will throw when passed in data check failed', function() {
    const apiFn = someFn(arg1 => {
    //  console.log(`!!!!!! ${ePrint(arg1)}`);
      return arg1.id + 'ok';
    });
    const data = {idd: 'tom'};
    const eMsg = `value:(${ePrint(data.id)}) should be string.`;
    expect(() => {
      apiFn(data); // should be {id: string}
    }).toThrowError(RunTimeCheckE, eMsg);
  });

  it('will exeute oriFn when check passed', function() {
    const ckFn = someFn(arg1 => {
      return arg1.id + 'ok';
    });
    expect(ckFn({id: 'tom'})).toEqual('tomok');
  });
});
