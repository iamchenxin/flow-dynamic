/* @flow
 *
 * Stardard checkers ,for common usage.
 */


import {RunTimeCheckE, ePrint} from '../definition/def.js';
import type { TypeCaster} from '../definition/def.js';

type Fn1Args<RT> = (arg1:any) => RT;
type Fn2Args<RT> = (arg1:any, arg2:any) => RT;
type Fn3Args<RT> = (arg1:any, arg2:any, arg3:any) => RT;

function any_caster<T>(v:T):any {
  return v;
}

/*
* Check the Frist arg for an uncheck function
*/
function check1<Arg1, RT>(
  caster1:TypeCaster<Arg1>,
  oriFn:(
    arg1:Arg1
  ) => RT
):Fn1Args<RT> {
  return wrappedFn;

  function wrappedFn(
    _arg1:any
  ):RT {
    try {
      const arg1 = caster1?caster1(_arg1):any_caster(_arg1);
      return oriFn(arg1);
    } catch (e) {
      throw e; // just rethrow
//      let msg = `\n${e}\n` +
//        `Arg1:\n${ePrint(_arg1)}\n`;
//      throw new RunTimeCheckE(msg);
    }
  }
}

/*
* Check the Frist&second arg for an uncheck function
*/
function check2<Arg1, Arg2, RT>(
  caster1:?TypeCaster<Arg1>,
  caster2:?TypeCaster<Arg2>,
  oriFn:(
    arg1:Arg1, arg2:Arg2
  ) => RT
):Fn2Args<RT> {
  return wrappedFn;

  function wrappedFn(
    _arg1:any, _arg2:any
  ):RT {
    try {
      const arg1 = caster1?caster1(_arg1):any_caster(_arg1);
      const arg2 = caster2?caster2(_arg2):any_caster(_arg2);
      return oriFn(arg1, arg2);
    } catch (e) {
      let msg = `\n${e}\n` +
        `Arg1:\n${ePrint(_arg1)}\n` +
        `Arg2:\n${ePrint(_arg2)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }

}

/*
* Check the Frist&second&3td arg for an uncheck function
*/
function check3<Arg1, Arg2, Arg3, RT>(
  caster1:?TypeCaster<Arg1>,
  caster2:?TypeCaster<Arg2>,
  caster3:?TypeCaster<Arg3>,
  oriFn:(
    arg1:Arg1, arg2:Arg2, arg3:Arg3
  ) => RT
):Fn3Args<RT> {
  return wrappedFn;

  function wrappedFn(
    _arg1:any, _arg2:any, _arg3:any
  ):RT {
    try {
      const arg1 = caster1?caster1(_arg1):any_caster(_arg1);
      const arg2 = caster2?caster2(_arg2):any_caster(_arg2);
      const arg3 = caster3?caster3(_arg3):any_caster(_arg3);
      return oriFn(arg1, arg2, arg3);
    } catch (e) {
      let msg = `\n${e}\n` +
        `Arg1:\n${ePrint(_arg1)}\n` +
        `Arg2:\n${ePrint(_arg2)}\n` +
        `Arg3:\n${ePrint(_arg3)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }

}

const pro = {
  check1,
  check2,
  check3
};

const dev = { //should not use dev = pro,thats a ref
  check1,
  check2,
  check3
};
// if no dev, just return the resolverToCheck,do not check.
if (process.env.NODE_ENV != 'dev') {
  dev.check1 = function<RT>(
    caster1:any,
    oriFn:(
      arg1:any
    ) => RT
  ):Fn1Args<RT> {
    return oriFn;
  };

  dev.check2 = function<RT>(
    caster1:any,
    caster2:any,
    oriFn:(
      arg1:any, arg2:any
    ) => RT
  ):Fn2Args<RT> {
    return oriFn;
  };

  dev.check3 = function<RT>(
    caster1:any,
    caster2:any,
    caster3:any,
    oriFn:(
      arg1:any, arg2:any, arg3:any
    ) => RT
  ):Fn3Args<RT> {
    return oriFn;
  };
}

export {
  pro,
  dev
};
