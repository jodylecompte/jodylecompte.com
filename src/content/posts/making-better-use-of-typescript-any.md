---
title: Making Better Use of TypeScript Any
description: Sometimes it can be extremely difficult to get a precise type dialed in and we resort to any, let's look at how we can slightly improve this experience.
postedDate: 2024-03-23T05:00:00-06:00
---

![A starry night sky.](../../images/posts/typescript_any.webp)

Sometimes it can be extremely difficult to get a precise type dialed in and we resort to any, let's look at how we can slightly improve this experience.

## Preface on Any

In a perfect and ideal world, we would never use `any` anywhere in our code. 

Unfortunately, we do not live and work in that world. I also do not know what constraints you are working under so in this article I am assuming you have a good reason to use `any`.

## The Problem With Any
The problem we encounter is that when using the `any` keyword in TypeScript, we are throwing type safety out
the window. Now TypeScript is unable to validate the correctness of your code and errors that could have been stopped at build are now possibly re-introduced a runtime errors. 

Fortunately, there's an agreeable middle ground here.

## Three Alternatives
We have the advantage of the fact that when the temptation arises to use `any`, it's typically not a scalar type. 

### Objects

Given the following:

```typescript
function getKeyCount(data: {[key: string]: any}): number {
    return Object.keys(data).length;
}

console.log(getKeyCount("This is a string"));
```

TypeScript won't complain about this. Even though we are attemtping to use the object prototype function `keys` on a non-object. This will compile without warning, but fail at runtime.

We can make a slight tweak to our type definition below.

```ts
function getKeyCount(data: {[key: string]: any}): number {
    return Object.keys(data).length;
}

console.log(getKeyCount("This is a string"));
```

Now TypeScript will correctly throw an error because the provided datatype is a string
and the expected data type is as object.


### Arrays
The process for arrays is nearly the same. 

TypeScript will not throw any errors for the following code despite logical errors.

```ts
function trimAndLowercase(collection: any) {
  return collection.map((s) => s.trim().toLowerCase());
}

const collection = "Hello World";
console.log(trimAndLowercase(collection))
```

But if we instead tell TypeScript explicitly that it is an array then we are more guarded against such mistakes.

```ts
function trimAndLowercase(collection: any[]) {
  return collection.map((s) => s.trim().toLowerCase());
}

const collection = "Hello World";
console.log(trimAndLowercase(collection)) // Error
```

Now TypeScript reports that the type if string is not assignable to type of `any[]`.

### Functions
TypeScript already does a pretty decent job of inferring function returns, even when there are a large number of potential branches, but one place this has absolutely bitten me is when typing a function signature that is passed as a prop in a frontend framework like React or Angular.

```ts
type ContactFormProps = {
    onSubmit: any;
}
```

With the above definition, this has multiple foot guns because TypeScript will not error in most situations. You might pass in something that isn't even callable (e.g. not a function), or pass in a function an call it with the wrong props. 

```ts
type ContactFormProps = {
    onSubmit: (param1: string, param2: string) => any;
}
```

This is much better because now we have ensured that what we utilize the correct parameters, and the correct types for those parameters and ensure that it's a funciton. 

But those parameters could be complex or difficult to type objects instead, in which case this is also acceptable:

```ts
type ContactFormProps = {
    onSubmit: (param1: string, param2: any) => any;
}
```

Even a little seasoning of type safety is better than one at all. 

## Conclusion
To be clear, none of these should be seen as alternatives to proper type annotations, both explicitly defined or inferrered by TypeScript. They are still not without potential pitt falls, like how example #1 with objects would not immediately throw an error for `data.length` because length *could* be a entry whose key is a string and type is `any`.

But to be realistic, I have never seen a TypeScript codebase that did not have at least a small sprinkling of `any` in the codebase, so in those scenarios, this does give you a little bit of extra safety with a minimal amount of extra effort.