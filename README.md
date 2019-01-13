# Compare anything 🛰

```
npm i compare-anything
```

Compares objects and arrays and tells you which props or values are duplicates, and which are only present once.

It works just like you would compare two columns in excel! But who needs excel when you've got JavaScript, am I right? 😃

## Meet the family

- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [find-and-replace-anything 🎣](https://github.com/mesqueeb/find-and-replace-anything)
- [compare-anything 🛰](https://github.com/mesqueeb/compare-anything)
- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [is-what 🙉](https://github.com/mesqueeb/is-what)

## Usage

It works just like you would expect. You `compare(objectA, objectB)` and it gives you all kind of info.

You can do all kind of things with compare-anything!

1. Compare arrays, to see which values are present in all arrays and which not
2. Compare object props, to see which props are present in all objects and which not
3. Compare object values, to see which prop values are equal in all objects and which not

## Compare arrays

Which values are present in which arrays. Will return an info object with:

- `values` - an array with all values of all arrays
- `presentInAll` - true/false per value
- `presentIn` - the param indexes of where the prop was present

```js
import { compareArrays } from 'compare-anything'

const arrayA = [1, 2, 'a']
const arrayB = [1, 'a', 'b']

compareArrays(arrayA, arrayB)
// returns ↓
{
  values: [1, 2, 'a', 'b'],
  presentInAll: new Map([
    [1, true], [2, false], ['a', true], ['b', false]
  ]),
  presentIn: new Map([
    [1, [0, 1]], [2, [0]], ['a', [0, 1]], ['b', [1]]
  ]),
}
```

## Compare object props

Which props are present in which objects. Will return an info object with:

- `props` - an array with all props of all objects
- `presentInAll` - true/false per prop
- `presentIn` - the param indexes of where the prop was present

```js
import { compareObjectProps } from 'compare-anything'

const objectA = {a: '', b: '', c: '', d: ''}
const objectB = {b: '', c: '', e: '', f: ''}

compareObjectProps(objectA, objectB)
// returns ↓
{
  props: ['a', 'b', 'c', 'd', 'e', 'f'],
  presentInAll: { a: false, b: true, c: true, d: false, e: false, f: false },
  presentIn: { a: [0], b: [0, 1], c: [0, 1], d: [0], e: [1], f: [1] },
}
```

## Compare object values

Which values are the same in which objects. Will return an info object with:

- `props` - an array with all props of all objects
- `sameInAll` - true/false per prop
- `sameIn` - sets of indexes of the objects where the value was equal

```js
import { compareObjectValues } from 'compare-anything'

const objectA = {a: '', b: 'same', c: 'diff', d: ''}
const objectB = {b: 'same', c: 'Diff', e: '', f: ''}
const objectC = {b: 'same', c: 'Diff'}
const objectE = {b: 'same', c: 'diff'}

compareObjectValues(objectA, objectB)
// returns ↓
{
  props: ['a', 'b', 'c', 'd', 'e', 'f'],
  sameInAll: { a: false, b: true, c: false, d: false, e: false, f: false },
  sameIn: { a: [], b: [[0, 1, 2, 3]], c: [[0, 3], [1, 2]], d: [], e: [], f: [] },
}
```
