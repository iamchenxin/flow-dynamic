/* @flow
*
*/

//import {RunTimeCheckE} from '../definition/def.js';

// union should be wrote by user , this implement is inefficient
export function union<A, B>(validA:(fv:mixed)=>A, validB:(fv:mixed)=>B)
  :(rv:mixed)=> A|B {
  return function(v:mixed):A|B {
    try {
      return validA(v);
    } catch (e) {
      return validB(v);
    }
  };
}
