/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';
import type { TypeCaster} from '../definition/def.js';

type Fn3Args = (arg1:any, arg2:any, arg3:any) => mixed;

function any_caster<T>(v:T):any {
  return v;
}

// standard check
function check1<Arg1>(
  caster1:TypeCaster<Arg1>,
  oriFn:(
    arg1:Arg1, arg2:any, arg3:any
  ) => mixed
):Fn3Args {
  return wrappedFn;

  function wrappedFn(
    _arg1:any, _arg2:any, _arg3:any
  ):mixed {
    try {
      const arg1 = caster1?caster1(_arg1):any_caster(_arg1);
      return oriFn(arg1, _arg2, _arg3);
    } catch (e) {
      let msg = `\n${e}\n` +
        `Arg1:\n${ePrint(_arg1)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }

}

// standard check
function check2<Arg1, Arg2>(
  caster1:?TypeCaster<Arg1>,
  caster2:?TypeCaster<Arg2>,
  oriFn:(
    arg1:Arg1, arg2:Arg2, arg3:any
  ) => mixed
):Fn3Args {
  return wrappedFn;

  function wrappedFn(
    _arg1:any, _arg2:any, _arg3:any
  ):mixed {
    try {
      const arg1 = caster1?caster1(_arg1):any_caster(_arg1);
      const arg2 = caster2?caster2(_arg2):any_caster(_arg2);
      return oriFn(arg1, arg2, _arg3);
    } catch (e) {
      let msg = `\n${e}\n` +
        `Arg1:\n${ePrint(_arg1)}\n` +
        `Arg2:\n${ePrint(_arg2)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }

}

// standard check
function check3<Arg1, Arg2, Arg3>(
  caster1:?TypeCaster<Arg1>,
  caster2:?TypeCaster<Arg2>,
  caster3:?TypeCaster<Arg3>,
  oriFn:(
    arg1:Arg1, arg2:Arg2, arg3:Arg3
  ) => mixed
):Fn3Args {
  return wrappedFn;

  function wrappedFn(
    _arg1:any, _arg2:any, _arg3:any
  ):mixed {
    try {
      const arg1 = caster1?caster1(_arg1):any_caster(_arg1);
      const arg2 = caster2?caster2(_arg2):any_caster(_arg2);
      const arg3 = caster3?caster1(_arg3):any_caster(_arg3);
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

const dev = {
  check1,
  check2,
  check3
};
// if no dev, just return the resolverToCheck,do not check.
if (process.env.NODE_ENV != 'dev') {
  dev.check1 = function(
    caster1:any,
    oriFn:(
      arg1:any, arg2:any, arg3:any
    ) => mixed
  ):Fn3Args {
    return oriFn;
  };

  dev.check2 = function(
    caster1:any,
    caster2:any,
    oriFn:(
      arg1:any, arg2:any, arg3:any
    ) => mixed
  ):Fn3Args {
    return oriFn;
  };

  dev.check3 = function(
    caster1:any,
    caster2:any,
    caster3:any,
    oriFn:(
      arg1:any, arg2:any, arg3:any
    ) => mixed
  ):Fn3Args {
    return oriFn;
  };
}

export {
  check1,
  check2,
  check3,
  dev
};
