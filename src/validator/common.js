// @flow
import { format } from '../utils/tools.js';

function mustBe<T>(shouldBe: T, value: mixed, errMsg?: Error|string): T {
  if ( value != shouldBe ) {
    let err = new Error(
      `value(${format(value)}) shoulde be (${format(shouldBe)})`);
    if ( typeof errMsg == 'string') {
      err = new Error(errMsg);
    }
  //  console.log(errMsg);
    if ( errMsg instanceof Error) {
      err = errMsg;
    }
    throw err;
  }
  return shouldBe;
}

function mustNot<T, N>(notBe: N, value: T|N, errMsg?: Error|string): T {
  if ( value == notBe ) {
    let err = new Error(
      `value(${format(value)}) most not be (${format(notBe)})`);
    if ( typeof errMsg == 'string') {
      err = new Error(errMsg);
    }
    if ( errMsg instanceof Error) {
      err = errMsg;
    }
    throw err;
  }
  return (value: any);
}

export {
  mustBe,
  mustNot,
};
