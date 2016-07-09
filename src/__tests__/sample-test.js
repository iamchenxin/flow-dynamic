/* @flow
 *
 * Example usage of the package
**/

declare var jest: Function;
declare var describe: Function;
declare var it: Function;
declare var expect: Function;

jest.unmock('../index.js');

import {
  pro,
  dev
} from '../index.js';

const {
  isString,
  argsCheck
} = pro;

import {RunTimeCheckE, ePrint} from '../definition/def.js';

class GraphQLNonNull {
  v:mixed;
  constructor(v:mixed) {
    this.v = v;
  }
}

type GraphQLResolveInfo = {
  test:string
};

const GraphQLID = 'GraphQLID';

describe('Basic usage for graphql', () => {


  it('valid', function() {

    type RelayQLIdResolverFn = (args:{id:string}, context: mixed,
      info: GraphQLResolveInfo) => mixed ;

    const SomeQLField = function(resolver: RelayQLIdResolverFn) {
      return {
        name: 'test',
        description: 'Fetches an object given its ID',
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve: argsCheck(
          args => ({ id: isString(args.id)}),
          (obj, args, context, info) => resolver(args, context, info)
        ),
      };
    };
    // create a field.
    const field = SomeQLField((args, context, info) => {
  // The passed in args have a right Flow Type,below codes will fail with flow
  //    const wrong = args.idd;
      return args.id + info.test;
    });

    // assume GraphQL passed data to it, test it
    expect(field.resolve(
      {},
      {id: 'tid'},
      {},
      {test: '!hello'}
    )).toEqual('tid!hello');

    const upE = new RunTimeCheckE('value:(undefined) should be string.');
    const eMsg = `\n${upE.toString()}\n` +
      `Args:\n${ePrint({idd: 'tid'})}\n`;
    expect(() => {
      field.resolve(
        {},
        {idd: 'tid'}, // if the data is typo,will throw
        {},
        {test: '!hello'}
      );
    }).toThrow(new RunTimeCheckE(eMsg));

  });

  it('when dev. ,will not check values at produce env', () => {

    type RelayQLIdResolverFn = (args:{id:string}, context: mixed,
      info: GraphQLResolveInfo) => mixed ;

    const SomeQLField = function(resolver: RelayQLIdResolverFn) {
      return {
        resolve: argsCheck(
          args => ({ id: dev.isString(args.id)}),
          (obj, args, context, info) => resolver(args, context, info)
        ),
      };
    };
    // create a field.
    const field = SomeQLField((args, context, info) => {
  // The passed in args have a right Flow Type,below codes will fail with flow
  //    const wrong = args.idd;
      return args.id + info.test;
    });

    // assume GraphQL passed data to it, test it
    expect(field.resolve(
      {},
      {id: 'tid'},
      {},
      {test: '!hello'}
    )).toEqual('tid!hello');

    expect(field.resolve(
      {},
      {idd: 'tid'}, // typo
      {},
      {test: '!hello'}
    )).toEqual('undefined!hello');// when use dev, will not check at product time
  });
});
