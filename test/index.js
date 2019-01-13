import test from 'ava'
import flatten from 'flatten-anything'
import { compareObjectProps } from '../dist/index.cjs'

test('compareObjectProps', t => {
  let res, objectA, objectB
  objectA = {a: '', b: '', c: '', d: ''}
  objectB = {b: '', c: '', e: '', f: ''}

  res = compareObjectProps(objectA, objectB)
  t.deepEqual(res, {
    props: ['a', 'b', 'c', 'd', 'e', 'f'],
    presentInAll: { a: false, b: true, c: true, d: false, e: false, f: false },
    presentIn: { a: [0], b: [0, 1], c: [0, 1], d: [0], e: [1], f: [1] },
  })
})

test('compareObjectProps flat', t => {
  let res
  const objectA = {nested: {a: '🃏️', b: '🎴'}}
  const objectB = {nested: {a: '🃏', c: '🀄️'}}
  const flatA = flatten(objectA)
  // →　{'nested.a': '🃏️', 'nested.b': '🎴'}
  const flatB = flatten(objectB)
  // →　{'nested.a': '🃏️', 'nested.c': '🀄️'}
  res = compareObjectProps(flatA, flatB)
  t.deepEqual(res, {
    props: ['nested.a', 'nested.b', 'nested.c'],
    presentInAll: { 'nested.a': true, 'nested.b': false, 'nested.c': false },
    presentIn: { 'nested.a': [0, 1], 'nested.b': [0], 'nested.c': [1] }
  })
})
