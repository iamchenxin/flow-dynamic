/* @flow
*
*/

import {RunTimeCheckE, ePrint} from '../definition/def.js';
//import type {TypeCaster} from '../definition/def.js';

function isLiteral<LIT1>(v:any, lit1:LIT1, eMsg?:string):LIT1 {
  if (v === lit1) {
    return v;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not` +
  ` a literal(${ePrint(lit1)}).`;
  throw new RunTimeCheckE(msg);
}

function isLiteral2<LIT1, LIT2>(v:any,
lit1:LIT1, lit2:LIT2,
eMsg?:string):LIT1|LIT2 {
  if ( (v === lit1) ||
    (v === lit2)
  ) {
    return v;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not` +
  ` a literal( ${ePrint(lit1)} | ${ePrint(lit2)} ).`;
  throw new RunTimeCheckE(msg);
}

function isLiteral3<LIT1, LIT2, LIT3>(v:any,
lit1:LIT1, lit2:LIT2, lit3:LIT3,
eMsg?:string):LIT1|LIT2|LIT3 {
  if ( (v === lit1) ||
    (v === lit2) ||
    (v === lit3)
  ) {
    return v;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not` +
  ` a literal( ${ePrint(lit1)} | ${ePrint(lit2)} | ${ePrint(lit3)} ).`;
  throw new RunTimeCheckE(msg);
}

function isLiteral4<LIT1, LIT2, LIT3, LIT4>(v:any,
lit1:LIT1, lit2:LIT2, lit3:LIT3, lit4:LIT4,
eMsg?:string):LIT1|LIT2|LIT3|LIT4 {
  if ( (v === lit1) ||
    (v === lit2) ||
    (v === lit3) ||
    (v === lit4)
  ) {
    return v;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not` +
  ` a literal( ${ePrint(lit1)} | ${ePrint(lit2)} | ${ePrint(lit3)}` +
  ` | ${ePrint(lit4)} ).`;
  throw new RunTimeCheckE(msg);
}

function isLiteral5<LIT1, LIT2, LIT3, LIT4, LIT5>(v:any,
lit1:LIT1, lit2:LIT2, lit3:LIT3, lit4:LIT4, lit5:LIT5,
eMsg?:string):LIT1|LIT2|LIT3|LIT4|LIT5 {
  if ( (v === lit1) ||
    (v === lit2) ||
    (v === lit3) ||
    (v === lit4) ||
    (v === lit5)
  ) {
    return v;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not` +
  ` a literal( ${ePrint(lit1)} | ${ePrint(lit2)} | ${ePrint(lit3)}` +
  ` | ${ePrint(lit4)} | ${ePrint(lit5)} ).`;
  throw new RunTimeCheckE(msg);
}

// Flow will use T as union type to collect type information for t1,t2,t3 ...
// so T will be a typeof t1|t2|t3 ... 
function isLiteral6<T: string>(v:any, t1:T, t2:T, t3:T, t4:T, t5:T, t6:T,
eMsg?:string):T {
  if ( (v === t1) ||
    (v === t2) ||
    (v === t3) ||
    (v === t4) ||
    (v === t5) ||
    (v === t6)
  ) {
    return v;
  }
  const msg = eMsg?eMsg:`value:(${ePrint(v)}) is not` +
  ` a literal( ${ePrint(t1)} | ${ePrint(t2)} | ${ePrint(t3)}` +
  ` | ${ePrint(t4)} | ${ePrint(t5)} | ${ePrint(t6)} ).`;
  throw new RunTimeCheckE(msg);
}

isLiteral.T2 = isLiteral2;
isLiteral.T3 = isLiteral3;
isLiteral.T4 = isLiteral4;
isLiteral.T5 = isLiteral5;
isLiteral.T6 = isLiteral6;

export {
  isLiteral,
};
