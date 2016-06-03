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
 ?? should allow 0 to be a valid default isFloat.clip default value?
