# Compare anything 🛰

Compares objects and tells you which props are duplicate, and which props are only present once.

It works just like you would compare two columns in excel! But who needs excel when you've got JavaScript, am I right? 😃

## Meet the family

- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [find-and-replace-anything 🎣](https://github.com/mesqueeb/find-and-replace-anything)
- [compare-anything 🛰](https://github.com/mesqueeb/compare-anything)
- copy-anything (WIP)
- [is-what 🙉](https://github.com/mesqueeb/is-what)

## Usage

It works just like you would expect. You `compare(objectA, objectB)` and it gives you all kind of info.

```js
const objectA = {a: '', b: '', c: '', d: ''}
const objectB = {b: '', c: '', e: '', f: ''}

compare(objectA, objectB)
// returns {}
```
