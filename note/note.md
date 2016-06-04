all the validator from `validator.js` is for string! mv them to `src/validator/string_v`

  * should make eslint validate  const args, so when a args checked ,
  wherever it passed to ,there is no need to check it again ,since it is always
  a const.

-------------------------------
  * how to write custom validator. (no need to write a exe function?)
function customChecker(v:mixed):string {
  const str = isString(v); // the corresponding flow type
  // ... user code ...
  // check failed -> throw
  // check pass -> return str
}

// no need to make a checker maker. because use resolver need to mark
a flow type.

-----------------------------------
  * need a supply a union checker like
  argsCheck(source,args,context);
  because in some case, like convert Relay's connection args, to offset,
  need both source and args.
  may be add a new checker name `complexCheck`? which called `argsCheck(source,args,context)` inside, instead of normal `argsCheck(args)`

-------------
 ?? should allow 0 to be a valid default isFloat.clip default value? (nope! use number instead)

-------------------
  * to check a part of Object (but want use the whole object).

type A = {
  sub:{
    a:number,
    b:number
  }
}
// -> could express as this.
type A = {
  sub:{
    [key:string]:mixed,
    b:number
  }
}
// but ! it seems should not checked like this! in graphql upstream's data type is known.
so ! if want use  sub, and sub.b ! should check the whole sub!
type A = {
  sub:{
    a:number,
    b:number
  }
}
// [key:string]:mixed, does not make sense! since the  type A is a known type!!!!

--------
 make dev to dev() in top index.js ? to void unresolved global var in circle ref modules
