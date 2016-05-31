/* @flow
*
*/
import type {
  GraphQLResolveInfo
} from 'flow-graphql';

import {
  inspect
} from 'util';

type DynamicCheckResolver = (source:mixed, args:{[key:string]:any},
    context:mixed, info?:GraphQLResolveInfo) => mixed;


type Checker<CheckType> = (data: any) => CheckType;

function any_checker<T>(v:T):any {
  return v;
}
// dynamic Checker
function dynamicCheck<SourceT, ArgsT, CxtT >(
  resolver:(source:SourceT, args:ArgsT,
    context:CxtT, info?:GraphQLResolveInfo) => mixed,
  sourceChecker:Checker<SourceT>,
  argsChecker?:Checker<ArgsT>,
  contextChecker?:Checker<CxtT>
):DynamicCheckResolver  {
  function dynamicResoler(_source:mixed, _args:{[key:string]:mixed },
    _context:mixed, info?:GraphQLResolveInfo):mixed {
    try {
      const source = sourceChecker(_source);
      if ( argsChecker ) {
        const args = argsChecker(_args);
        if ( contextChecker ) {
          const context = contextChecker(_context);
          return resolver(source, args, context, info);
        }
        return resolver(source, args, any_checker(_context), info);
      }
      return resolver(source, any_checker(_args), any_checker(_context), info);

    } catch (e) {
      let txt = `${e}`;
      if (_source) {
        txt = `Dynamic Check failed!\n${txt}\nwith data \n` + inspect(_source,
          { showHidden: true, depth: null, colors:true });
      }
      throw new Error(txt);
    }
  }
  return dynamicResoler;
}

export {
  dynamicCheck
};

export type {
  DynamicCheckResolver,
  Checker
};
