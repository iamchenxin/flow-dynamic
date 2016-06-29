/* @flow
 *
 */

import {
  inspect
} from 'util';

function RunTimeCheckE(message:string):void {
  this.name = 'RunTimeCheckE';
  this.message = message || 'RunTimeCheck Error';
  this.stack = (new Error()).stack;
}
RunTimeCheckE.prototype = Object.create(Error.prototype);
RunTimeCheckE.prototype.constructor = RunTimeCheckE;

function ePrint(v:mixed):string {
  return inspect(v,
    { showHidden: true, depth: null });
}

type TypeCaster<T> = (v:any) => T;
type ComplexCaster<T> =
  (source:any, args:{[key:string]:any}, context:any) => T;

export {
  RunTimeCheckE,
  ePrint
};

export type {
  TypeCaster,
  ComplexCaster
};
