/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';
import type { TypeCaster, ComplexCaster} from '../definition/def.js';
import type {
  GraphQLResolveInfo
} from 'flow-graphql';

type GraphQLResolver = (source:mixed, args:{[key:string]:any},
    context:mixed, info:GraphQLResolveInfo) => mixed;

function any_caster<T>(v:T):any {
  return v;
}

// standard check
function check<SourceT, ArgsT, CxtT >(
  sourceCaster:?TypeCaster<SourceT>,
  argsCaster:?TypeCaster<ArgsT>,
  contextCaster:?TypeCaster<CxtT>,
  checkedResolver:(
    source:SourceT, args:ArgsT,
    context:CxtT, info:GraphQLResolveInfo
  ) => mixed
):GraphQLResolver {
  return graphqlResolver;

  function graphqlResolver(
      _source:mixed, _args:{[key:string]:mixed},
      _context:mixed, _info:GraphQLResolveInfo
    ):mixed {

    try {
      const source = sourceCaster?sourceCaster(_source):any_caster(_source);
      const args = argsCaster?argsCaster(_args):any_caster(_args);
      const context = contextCaster?contextCaster(_context):any_caster(_context);
      return checkedResolver(source, args, context, _info);
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
function sourceCheck<SourceT>(
  sourceCaster: TypeCaster<SourceT>,
  checkedResolver:(
    source:SourceT, args:{[key:string]:mixed},
    context:mixed, info:GraphQLResolveInfo
  ) => mixed
):GraphQLResolver {
  return graphqlResolver;

  function graphqlResolver(
    _source:mixed, _args:{[key:string]:mixed},
    _context:mixed, _info:GraphQLResolveInfo
  ):mixed {
    try {
      const source = sourceCaster(_source);
      return checkedResolver(source, _args, _context, _info);
    } catch (e) {
      const msg = `\n${e}\n` +
        `Source:\n${ePrint(_source)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }
}

// args Check Only
function argsCheck<ArgsT>(
  argsCaster: TypeCaster<ArgsT>,
  checkedResolver:(
    source:mixed, args:ArgsT,
    context:mixed, info:GraphQLResolveInfo
  ) => mixed
):GraphQLResolver {
  return graphqlResolver;

  function graphqlResolver(
    _source:mixed, _args:{[key:string]:mixed},
    _context:mixed, _info:GraphQLResolveInfo
  ):mixed {
    try {
      const args = argsCaster(_args);
      return checkedResolver(_source, args, _context, _info);
    } catch (e) {
      const msg = `\n${e}\n` +
        `Args:\n${ePrint(_args)}\n`;
      throw new RunTimeCheckE(msg);
    }
  }
}

// complexCheck every caster receive (_source, _args, _context)
// instead of only one
function complexCheck<SourceT, ArgsT, CxtT >(
  sourceCaster:?ComplexCaster<SourceT>,
  argsCaster:?ComplexCaster<ArgsT>,
  contextCaster:?ComplexCaster<CxtT>,
  checkedResolver:(
    source:SourceT, args:ArgsT,
    context:CxtT, info:GraphQLResolveInfo
  ) => mixed
):GraphQLResolver {
  return graphqlResolver;

  function graphqlResolver(
      _source:mixed, _args:{[key:string]:mixed},
      _context:mixed, _info:GraphQLResolveInfo
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
      return checkedResolver(source, args, context, _info);
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
// if no dev, just return the checkedResolver,do not check.
if (process.env.NODE_ENV != 'dev') {

  dev.check = function(
    sourceCaster:any,
    argsCaster:any,
    contextCaster:any,
    checkedResolver:(
      source:any, args:any,
      context:any, info:GraphQLResolveInfo
    ) => mixed
  ):GraphQLResolver {
    return (checkedResolver:any);
  };
  dev.sourceCheck = function(
    sourceCaster:any,
    checkedResolver:(
      source:any, args:any,
      context:any, info:GraphQLResolveInfo
    ) => mixed
  ):GraphQLResolver {
    return (checkedResolver:any);
  };
  dev.argsCheck = function(
    argsCaster:any,
    checkedResolver:(
      source:any, args:any,
      context:any, info:GraphQLResolveInfo
    ) => mixed
  ):GraphQLResolver {
    return (checkedResolver:any);
  };
  dev.complexCheck = dev.check;
}


export {
  check,
  sourceCheck,
  argsCheck,
  complexCheck,
  dev
};
