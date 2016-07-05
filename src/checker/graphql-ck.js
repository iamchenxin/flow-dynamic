/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';
import type { TypeCaster, ComplexCaster} from '../definition/def.js';

type GraphQLResolver<infoT> = (source:mixed, args:{[key:string]:any},
    context:mixed, info:infoT) => mixed;

function any_caster<T>(v:T):any {
  return v;
}

// standard check
function check<SourceT, ArgsT, CxtT, infoT>(
  sourceCaster:?TypeCaster<SourceT>,
  argsCaster:?TypeCaster<ArgsT>,
  contextCaster:?TypeCaster<CxtT>,
  resolverToCheck:(
    source:SourceT, args:ArgsT,
    context:CxtT, info:infoT
  ) => mixed
):GraphQLResolver<infoT> {
  return graphqlResolver;

  function graphqlResolver(
      _source:mixed, _args:{[key:string]:mixed},
      _context:mixed, _info:infoT
    ):mixed {

    try {
      const source = sourceCaster?sourceCaster(_source):any_caster(_source);
      const args = argsCaster?argsCaster(_args):any_caster(_args);
      const context = contextCaster?contextCaster(_context):any_caster(_context);
      return resolverToCheck(source, args, context, _info);
    } catch (e) {
      let msg = `\n${e}\n` +
        `Source:\n${ePrint(_source)}\n` +
        `Args:\n${ePrint(_args)}\n` +
        `Context:\n${ePrint(_context)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }
}

// Source Check Only
// ToDo : should restrict resolverToCheck to resolverToCheck(source:SourceT,info:infoT) ?
// not checked params should not be used ??? args, context should be removed?
function sourceCheck<SourceT, infoT>(
  sourceCaster: TypeCaster<SourceT>,
  resolverToCheck:(
    source:SourceT, args:{[key:string]:mixed},
    context:mixed, info:infoT
  ) => mixed
):GraphQLResolver<infoT> {
  return graphqlResolver;

  function graphqlResolver(
    _source:mixed, _args:{[key:string]:mixed},
    _context:mixed, _info:infoT
  ):mixed {
    try {
      const source = sourceCaster(_source);
      return resolverToCheck(source, _args, _context, _info);
    } catch (e) {
      const msg = `\n${e}\n` +
        `Source:\n${ePrint(_source)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }
}

// args Check Only
function argsCheck<ArgsT, infoT>(
  argsCaster: TypeCaster<ArgsT>,
  resolverToCheck:(
    source:mixed, args:ArgsT,
    context:mixed, info:infoT
  ) => mixed
):GraphQLResolver<infoT> {
  return graphqlResolver;

  function graphqlResolver(
    _source:mixed, _args:{[key:string]:mixed},
    _context:mixed, _info:infoT
  ):mixed {
    try {
      const args = argsCaster(_args);
      return resolverToCheck(_source, args, _context, _info);
    } catch (e) {
      const msg = `\n${e}\n` +
        `Args:\n${ePrint(_args)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }
}

// complexCheck every caster receive (_source, _args, _context)
// instead of only one
function complexCheck<SourceT, ArgsT, CxtT, infoT>(
  sourceCaster:?ComplexCaster<SourceT>,
  argsCaster:?ComplexCaster<ArgsT>,
  contextCaster:?ComplexCaster<CxtT>,
  resolverToCheck:(
    source:SourceT, args:ArgsT,
    context:CxtT, info:infoT
  ) => mixed
):GraphQLResolver<infoT> {
  return graphqlResolver;

  function graphqlResolver(
      _source:mixed, _args:{[key:string]:mixed},
      _context:mixed, _info:infoT
    ):mixed {
    try {
      const source = sourceCaster?
        sourceCaster(_source, _args, _context):
        any_caster(_source);
      const args = argsCaster?
        argsCaster(_source, _args, _context):
        any_caster(_args);
      const context = contextCaster?
        contextCaster(_source, _args, _context):
        any_caster(_context);
      return resolverToCheck(source, args, context, _info);
    } catch (e) {
      let msg = `\n${e}\n` +
        `Source:\n${ePrint(_source)}\n` +
        `Args:\n${ePrint(_args)}\n` +
        `Context:\n${ePrint(_context)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }

}

const dev = {
  check,
  sourceCheck,
  argsCheck,
  complexCheck
};
// if no dev, just return the resolverToCheck,do not check.
if (process.env.NODE_ENV != 'dev') {
  dev.check = function(
    sourceCaster:any,
    argsCaster:any,
    contextCaster:any,
    resolverToCheck:(
      source:any, args:any,
      context:any, info:any
    ) => mixed
  ):GraphQLResolver<any> {
    return (resolverToCheck:any);
  };
  dev.sourceCheck = function(
    sourceCaster:any,
    resolverToCheck:(
      source:any, args:any,
      context:any, info:any
    ) => mixed
  ):GraphQLResolver<any> {
    return (resolverToCheck:any);
  };
  dev.argsCheck = function(
    argsCaster:any,
    resolverToCheck:(
      source:any, args:any,
      context:any, info:any
    ) => mixed
  ):GraphQLResolver<any> {
    return (resolverToCheck:any);
  };
  dev.complexCheck = dev.check;
}

const pro = {
  check,
  sourceCheck,
  argsCheck,
  complexCheck
};
export {
  pro,
  dev
};
