/* @flow
*
*/

jest.unmock('../dev.js');
jest.unmock('../index.js');
jest.unmock('../../definition/def.js');

import {dev} from '../dev.js';
import {pro} from '../index.js';
import { ePrint} from '../../definition/def.js';




describe('test dev tables', () => {

  it('all the functions exist in pro should exist in dev', function() {

    expect(() => {
      testFunctions(pro, dev);
    }).not.toThrow();

    function testFunctions(_p, _d) {
      const fnames = Object.keys(_p);
      if (fnames.length<=0) {
        return;
      }
      fnames.map(name => {
        if ( _d.hasOwnProperty(name) == false ) {
          throw new Error(`the pro has a ${name},which dev has not.\n`+
          `sub of pro:\n${ePrint(fnames)}\n` +
          `sub of dev:\n${ePrint(Object.keys(_d))}\n`);
        }
        const v = 1;
        const rt = _d[name](v);
        switch (typeof rt) {
        case 'function': // it is a function returnCopy():(v:mixed)=>any
          if ( v !== rt(v) ) {
            throw new Error(`dev(${name}) should just return v`);
          }
          break;
        default:
          if ( rt !== v) {
            throw new Error(`dev(${name}) should just return v`);
          }
        }
        testFunctions(_p[name], _d[name]);
      });
    }
  });
});
