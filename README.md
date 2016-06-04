## Flow-Dynamic
A helper library link runtime type check to static flow check.

## How To:

Assume you have a resolver, which the passed args is out of static type check. 
```
const resolver = (src:any) => {
  // .... doing something
  return src;
});
```
to check it,just wrap it by `check functions`.<br/>
like: `sourceCheck(sourceCaster, checkedResolver)` .`checkedResolver` is your old resolver .And `sourceCaster` is a type caster(which  do dynamic check for args,and link them to flow type.)
```
const resolver = sourceCheck(
(src) => ({
  mail:pro.isString.isEmail(src.mail) // check src.mail .
}), (src) => {
  // .... doing something
  return src;
});
```
Like `React`,you only need to test the field will be used. As above,we test `mail`,so the type checked `src` pass to your old resolver is `{mail:string}`(with isEmail ensuring).<br/>
Let's test it:
```
function test() {
  const user = {
    id:'aaa',
    name:'tom',
    age:28,
    mail:'xx@mail.com'// will pass, and 'xx@mail' will throw a error.
  };
  const rt = resolver(user, {}, {}, ({}:any));
  return rt;
}
```
