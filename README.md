## Flow-Dynamic
A helper library to link runtime type check to static flow check.

## My English is poor
Feel free to correct my words,or rewrite sentences,really appreciate it.

## For quick start
goto [flow-dynamic/wiki](https://github.com/iamchenxin/flow-dynamic/wiki/Home).<br/>

## Why need dynamic check?
1. Data go though typed and untyped packages.(this case should be resolved by flow typed all packages)
2. Data are in a complex code stream between packages,too complex for flow type between those packages. (Like graphql's resolver,which be used in graphql-relay,and the params are narrowed to a custom type).
3. Data from remote,out of your control.(In this case,flow-dynamic could be used at both client and server,with single type valid logic).

## Recommend Validate Style
if the params need to check is short.I prefer write them inline.
like:
```
const wrappedFn = check1(
(v) => ({
  mail:pro.isString.isEmail(v.mail) // check src.mail.
}), (v) => { // Now, the input data is validated and have a Flow type {mail:string}
  // .... doing something
});
```
if things gets longer,should write a separated caster:
```
const userValid = (src) => ({
  id:pro.isString(src.id),
  name:pro.isString(src.name),
  age:pro.isNumber(src.age),
  friend:pro.isArray.isNumArr.inLength(src.friend, {max:5}),
});
```
In your real project,there also should be an explicitly Flow type wrote by you.
```
type USER = {
  id:string,
  name:string,
  age:number,
  friend:number[]
};
const userValid = (src) => ({
  id:pro.isString(src.id),
  name:pro.isString(src.name),
  age:pro.isNumber(src.age),
  friend:pro.isArray.isNumArr.inLength(src.friend, {max:5}),
});

const resolver = check1(userValid, (src:USER) => {
  // .... doing something
});
```
Note: explicitly declare `(src:USER)` to your hand-writing Flow type is helpful, will avoid wrong typo in writing userValid. If the `userValid` you writing is not corresponding with `USER` , flow will notice you.

## Functions
1. validate functions are group by the corresponding Flow type.Like `pro.isArray.isNumArr.inLength`.
2. There are three top namespace for `validator`. `dev` `pro` `cvt`.
  1.  `pro`(product) contain all `validator` which do not modify the input be checked.
  2.  `dev`(develop) is just a copy from `pro`. but when `NODE_ENV != 'dev'`,all function in dev will do nothing,and just return the passed in value back. (So dev is used for those type check you think should not be checked in production environment).
  3. `cvt`(convert). This namespace contain all `validator`s which will mutate the been checked value. (Like setdefault for passin value,or clip them. or more complex usage. Like Graphql's connection cursor can be narrowed to offset when you using an array-like data model).
3. `checker`: The common checker is in `normal.js`. And i hand-writed some custom checker for `graphql`(in `graphql-ck.js` have more clearly Error notice,its in namespace`graph` ).
4. Code demonstration could be find in `__tests__` folds in `src`, and my [pr](https://github.com/graphql/graphql-relay-js/pull/89) to `graphql-relay`.
