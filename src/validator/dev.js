/* @flow
 *
 */

const dev = {
  isBoolean: _copy,
  isInstanceof:_copy,
  isNull:_copy,
  nullable:returnCopy,
  isUndef:_copy,
  undefable:returnCopy,
  union:returnCopy,

  isNumber:_copy,

  isString:_copy,
  isArray:_copy,
  isObject:_copy
};

// not sure if one function or inline function will be optimized by js engine
dev.isNumber.inRange = _copy_lv2;
dev.isNumber.isInt = _copy_lv2;
dev.isNumber.isFloat = _copy_lv2;
dev.isNumber.isInt.inRange = _copy_lv3;
dev.isNumber.isFloat.inRange = _copy_lv3;

dev.isString.isEmail = (v:any):any => v;
dev.isString.isAscii = (v:any):any => v;

dev.isArray.isNumArr = (v:any):any => v;
dev.isArray.isStrArr = (v:any):any => v;
dev.isArray.isArrOf = (v:any, c:any):any => v;
dev.isArray.isNumArr.inLength = (v:any, c:any):any => v;
dev.isArray.isStrArr.inLength = (v:any, c:any):any => v;
dev.isArray.isArrOf.inLength = (v:any, c:any):any => v;

dev.isObject.isMapOf = (v:any):any => v;
dev.isObject.isStringMap = (v:any):any => v;
dev.isObject.isNumberMap = (v:any):any => v;

function _copy(v:mixed):any {
  return v;
}

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
