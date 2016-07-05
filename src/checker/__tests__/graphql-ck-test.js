/* @flow
*
*/

jest.unmock('../graphql-ck.js');
jest.unmock('../../definition/def.js');
jest.unmock('../../validator/index.js');

import {
  pro as gpro
} from '../graphql-ck.js';
const {check} = gpro;
import {RunTimeCheckE, ePrint} from '../../definition/def.js';
import {
  pro,
} from '../../validator/index.js';

type CheckedSrc = {
  id: string,
  name: string,
  age:number
}
const srcCaster = (source) => ({
  id:pro.isString(source.id),
  name:pro.isString(source.name),
  age:pro.isNumber(source.age)
});

type CheckedArgs = {
  id: string,
  name: string,
  position:{
    x:number,
    y:number
  }
}
const argsCaster = (args) => ({
  id:pro.isString(args.id),
  name:pro.isString(args.name),
  position:{
    x:pro.isNumber(args.position.x),
    y:pro.isNumber(args.position.y),
  }
});

type CheckedContext = {
  server:string
}
const contextCaster = (cxt) => ({
  email:pro.isString.isAscii(cxt.email)
});


describe('test check()', () => {
  let src;
  let args;
  let context;
  const graphqlResolver = check(
    srcCaster, argsCaster, contextCaster,
    (source:CheckedSrc, args:CheckedArgs, cxt:CheckedContext) => {
      console.log(ePrint(source));
      return 0;
    });

  beforeEach(() => {
    src = {
      id:'123',
      name:'tom',
      age:28
    };
    args = {
      id: 'aaa',
      name: 'superman',
      position:{
        x:11,
        y:23
      }
    };
    context = {
      server:'uk'
    };
  });
  it('will throw when passed in check failed', function() {
    src.id = 8888; // bad:  number vs string
    let msg = '\nRunTimeCheckE: value:(8888) should be string.\n' +
      `Source:\n${ePrint(src)}\n` +
      `Args:\n${ePrint(args)}\n` +
      `Context:\n${ePrint(context)}\n`;
    expect(() => {
      graphqlResolver(src, args, context);
    }).toThrow(new RunTimeCheckE(msg));
  });
  it('can valid partial ', () => {
    const resolver = check(
      (src) => ({
        age:pro.isNumber.isInt.inRange(src.age, {min:0, intervals:'(]'})
      }), null, null,
      (source:{age:number}) => {
        return source.age;
      });
    src.age = -28;

    let msg = '\nRunTimeCheckE: value(-28) is not in Range: { min: 0, intervals: \'(]\' }\n' +
      `Source:\n${ePrint(src)}\n` +
      `Args:\n${ePrint(args)}\n` +
      `Context:\n${ePrint(context)}\n`;
    expect(() => {
      resolver(src, args, context);
    }).toThrow(new RunTimeCheckE(msg));
  });

  it('check data sequentially, isNumber -> isFloat -> inRange  ', () => {
    src.age = -28; // given src is not a float, then not in range.
    // so isFloat will throw.
    const resolver = check(
      (src) => ({
        age:pro.isNumber.isFloat.inRange(src.age, {min:0, intervals:'(]'})
      }), null, null,
      (source:{age:number}) => {
        return source.age;
      });

    let msg = '\nRunTimeCheckE: value:(-28) is not a float\n' +
      `Source:\n${ePrint(src)}\n` +
      `Args:\n${ePrint(args)}\n` +
      `Context:\n${ePrint(context)}\n`;
    expect(() => {
      resolver(src, args, context);
    }).toThrow(new RunTimeCheckE(msg));
  });

});
