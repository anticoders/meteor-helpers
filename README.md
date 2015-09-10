# meteor-helpers

This package implements a simple namespacing pattern which you can use
to keep your global helpers organized and easily accessible.

## Getting started

Start by adding the package to your meteor project
```
meteor add anti:helpers
```
Then, create a global namespace object which we are going to use to define our helpers:
```javascript
MyHelpers = new AntiHelpers();
```
The code should probably go to your `lib` directory, to make sure it loads before
the other `js` files and the `MyHelpers` object is easily accessible everywhere.
Now, you add new helpers by calling `define` method of `MyHelpers` object
```javascript
MyHelpers.define('capitalize', function (value) {
  return value.toString().toUpperCase();
});

MyHelpers.define('createdAt', function () {
  return moment(this.createdAt).format('YYYY/MM/DD');
});
```
To make the helpers available from your templates code, you need to register them
```javascript
MyHelpers.registerAs('$');
```
You can do that at anytime, so there's no need to wait until you're done with defining your helpers.
Now, both `capitalize` and `createdAt` can be used like this
```html
<template name="post">
{{#with post}}
  <h1>{{$.capitalize ./title}}</h1>
  <h2>{{$.createdAt}}</h2>
  <p>{{./content}}</p>
{{/with}}
</template>
```
You can also access your helper from your javascript code like this
```javascript
MyHelpers.capitalize('text');
```
They're not properties of the `MyHelpers` object, instead they belong
to it's prototype. This implies that `define` and `registerAs` are reserved
words.

## Why do I need this?

You may want to use this pattern when your application grows large and it slowly
becomes hard to maintain all the global helpers you've implemented over time.
There are several benefits of using `anit:helpers` to manage them:

1. You can naturally split your global helpers into several groups, each using their own namespace.
2. Writing `{{$.createdAt}}` is more expressive than `{{createdAt}}`. If we use the former, it's evident
   that we are dealing with a global helper, while in the latter case it's not even clear if this is a helper or
   data context property.
3. The helpers are easily accessible from both javascript code and within you templates.

## Beyond basics (experimental)

You can also use `AntiHelpers` in reactive mode:
```javascript
MyHelpers = new AntiHelpers({ reactive: true });
```
When `reactive` flag is used, the helpers can re-render themselves when you
change their implementation. This provides a useful abstraction layer, when
you want to have a group of helpers that change their behavior based on application,
but you don't really want to embed that login into your UI implementation.




