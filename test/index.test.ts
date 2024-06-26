import { expect, test } from 'vitest'
import { compareArrays, compareObjectProps } from '../src/index.js'

test('compareObjectProps', () => {
  let res, objectA, objectB
  objectA = { a: '', b: '', c: '', d: '' }
  objectB = { b: '', c: '', e: '', f: '' }

  res = compareObjectProps(objectA, objectB)
  expect(res).toEqual({
    props: ['a', 'b', 'c', 'd', 'e', 'f'],
    presentInAll: { a: false, b: true, c: true, d: false, e: false, f: false },
    presentIn: { a: [0], b: [0, 1], c: [0, 1], d: [0], e: [1], f: [1] },
    perProp: {
      a: [objectA],
      b: [objectA, objectB],
      c: [objectA, objectB],
      d: [objectA],
      e: [objectB],
      f: [objectB],
    },
  })
})

test('compareObjectProps 3 or more', () => {
  let res, objectA, objectB, objectC, objectD
  objectA = { a: '', b: '', c: '', d: '' }
  objectB = { b: '', c: '', e: '', f: '' }
  objectC = { b: '1', e: '', d: '' }
  objectD = { b: '2', c: '', a: '', f: '' }

  res = compareObjectProps(objectA, objectB, objectC, objectD)
  expect(res).toEqual({
    props: ['a', 'b', 'c', 'd', 'e', 'f'],
    presentInAll: { a: false, b: true, c: false, d: false, e: false, f: false },
    presentIn: {
      a: [0, 3],
      b: [0, 1, 2, 3],
      c: [0, 1, 3],
      d: [0, 2],
      e: [1, 2],
      f: [1, 3],
    },
    perProp: {
      a: [objectA, objectD],
      b: [objectA, objectB, objectC, objectD],
      c: [objectA, objectB, objectD],
      d: [objectA, objectC],
      e: [objectB, objectC],
      f: [objectB, objectD],
    },
  })
})

test('compareObjectProps flat', () => {
  let res
  const objectA = { nested: { a: '🃏️', b: '🎴' } }
  const objectB = { nested: { a: '🃏', c: '🀄️' } }
  const flatA = { 'nested.a': '🃏️', 'nested.b': '🎴' }
  const flatB = { 'nested.a': '🃏️', 'nested.c': '🀄️' }
  res = compareObjectProps(flatA, flatB)
  expect(res).toEqual({
    props: ['nested.a', 'nested.b', 'nested.c'],
    presentInAll: { 'nested.a': true, 'nested.b': false, 'nested.c': false },
    presentIn: { 'nested.a': [0, 1], 'nested.b': [0], 'nested.c': [1] },
    perProp: {
      'nested.a': [flatA, flatB],
      'nested.b': [flatA],
      'nested.c': [flatB],
    },
  })
})

test('compareArrays', () => {
  let res, arrayA, arrayB
  arrayA = ['a', 'b', 'c', 'd']
  arrayB = ['b', 'c', 'e', 'f']

  res = compareArrays(arrayA, arrayB)
  expect(res).toEqual({
    values: ['a', 'b', 'c', 'd', 'e', 'f'],
    infoPerValue: {
      a: { indexPerArray: [0, undefined], presentInAll: false },
      b: { indexPerArray: [1, 0], presentInAll: true },
      c: { indexPerArray: [2, 1], presentInAll: true },
      d: { indexPerArray: [3, undefined], presentInAll: false },
      e: { indexPerArray: [undefined, 2], presentInAll: false },
      f: { indexPerArray: [undefined, 3], presentInAll: false },
    },
    presentInAll: ['b', 'c'],
  })
})
