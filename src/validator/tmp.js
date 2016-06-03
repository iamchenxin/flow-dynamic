/* @flow
*
*/
type TypeCaster<T> = (v:mixed) => T;

const pro = {
  string(v:mixed):string {
    if (typeof v !== 'string') {
      throw new Error(`value:(${v}) should be string.`);
    }
    return v;
  },
  number(v:mixed):number {
    if (typeof v !== 'number') {
      throw new Error(`value:(${v}) should be number.`);
    }
    return v;
  },
  nullable<T>(v:T):?T {
    if (v==null) {
      return null;
    }
    return v;
  }
};

let dev = pro;
if (process.env.NODE_ENV != 'dev') {
  function _copy(v:mixed):any {
    return v;
  }
  dev = {
    string:_copy,
    number:_copy
  };
}

function Nulla<T>(f:(fv:mixed)=>T):(nv:mixed)=>?T {
  return function(v:mixed):?T {
    if (v===null) {return null;}
    return f(v);
  };
}

// this is check some field should not be defined
function MkUndefined<T>(f:TypeCaster<T>):(v:mixed) => void {
  return function(v:mixed):void {
    if (typeof v === 'undefined') {return undefined;}
    throw new Error('!');
  };
}


export {
  dev, pro, Nulla, MkUndefined
};
