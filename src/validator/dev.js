/* @flow
 *
 */

const dev = {
  isBoolean: (v:any):any => v,
  isInstanceof:(v:any):any => v,
  isNull:(v:any):any => v,
  nullable:returnCopy,
  isMaybe:(v:any):any => v,
  maybe:returnCopy,
  isUndef:(v:any):any => v,
  undefable:returnCopy,
  union:returnCopy,
  isLiteral:(v:any, t:any):any => v,
  isEnum:(v:any, t:any):any => v,

  isNumber:(v:any):any => v,

  isString:(v:any):any => v,
  isArray:(v:any):any => v,
  isObject:(v:any):any => v
};

// not sure if one function or inline function will be optimized by js engine
dev.isLiteral.T2 = (v:any, t:any):any => v;
dev.isLiteral.T3 = (v:any, t:any):any => v;
dev.isLiteral.T4 = (v:any, t:any):any => v;
dev.isLiteral.T5 = (v:any, t:any):any => v;

dev.isNumber.inRange = _copy_lv2;
dev.isNumber.isInt = _copy_lv2;
dev.isNumber.isFloat = _copy_lv2;
dev.isNumber.isInt.inRange = _copy_lv3;
dev.isNumber.isFloat.inRange = _copy_lv3;

dev.isString.isEmail = (v:any):any => v;
dev.isString.isAscii = (v:any):any => v;

dev.isArray.isNumArr = (v:any):any => v;
dev.isArray.isStrArr = (v:any):any => v;
dev.isArray.isObjArr = (v:any):any => v;
dev.isArray.isArrOf = (v:any, c:any):any => v;

dev.isArray.inLength = (v:any, c:any):any => v;
dev.isArray.isNumArr.inLength = (v:any, c:any):any => v;
dev.isArray.isStrArr.inLength = (v:any, c:any):any => v;
dev.isArray.isObjArr.inLength = (v:any, c:any):any => v;
dev.isArray.isArrOf.inLength = (v:any, c:any):any => v;

dev.isArray.isLength = (v:any, c:any):any => v;
dev.isArray.isNumArr.isLength = (v:any, c:any):any => v;
dev.isArray.isStrArr.isLength = (v:any, c:any):any => v;
dev.isArray.isObjArr.isLength = (v:any, c:any):any => v;

dev.isObject.isMapOf = (v:any):any => v;
dev.isObject.isStringMap = (v:any):any => v;
dev.isObject.isNumberMap = (v:any):any => v;

/*
function _copy(v:mixed):any {
  return v;
}
*/

function _copy_lv2(v:mixed):any {
  return v;
}

function _copy_lv3(v:mixed):any {
  return v;
}

function returnCopy():(v:mixed)=>any {
  return function(v:mixed):any {
    return v;
  };
}

export {
  dev
};
