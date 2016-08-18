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
  dev,
//  cvt
} from '../index.js';

const {
  isString,
  argsCheck,
  isArray,
  isNumber,
  maybe,
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

export function aFlowBug() {
  const nullableArray = pro.nullable(pro.isArray);
  const vv:null|Array<any> = nullableArray('');
  return vv;
}

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

describe('new feature', () => {
  describe('isObjArr', () => {
    const arr_valid = v => ({
      a: isArray.isObjArr(v.a, 'eee'),
    });

    it('will throw', () => {
      const data = {
        a: [1, {n:1}]
      };
      expect(() => {
        const rt:{a:Array<Object>} = arr_valid(data);
        return rt;
      }).toThrowError(RunTimeCheckE, 'eee');
    });

    it('will pass', () => {
      const data = {
        a: [{}, {n:1}]
      };
      expect(arr_valid(data))
        .toEqual(data);
    });
  });

  describe('direct cast', () => {
    const undata = [1, ['aaa', 'bbb']];
    it('will throw', () => {
      expect(() => {
        const d:[string, Array<string>] = pro.cast(undata, v => ([
          isString(v[0], 'string'),
          isArray.isStrArr(v[1], 'string[]'),
        ]));
        return d;
      }).toThrowError(RunTimeCheckE, 'string');
    });

    it('will pass', () => {
      const d:[number, Array<string>] = pro.cast(undata, v => ([
        isNumber(v[0], 'number'),
        isArray.isStrArr(v[1], 'string[]'),
      ]));
      expect(d)
        .toEqual(undata);
    });
  });

  describe('maybe', () => {
    it('cast string to ?string', () => {
      const d: string = 'aaa';
      const v: ?string = pro.cast(d, un => maybe(isString)(un) );
      expect(v).toEqual(d);
    });
  });
});
