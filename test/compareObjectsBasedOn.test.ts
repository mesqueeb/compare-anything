// @ts-check
import { test, expect } from 'vitest'
import { compareObjectsBasedOn } from '../src'

test('compareObjectsBasedOn', () => {
  const base = { a: 1, b: true, c: 'CC' }
  const check = { d: 1 }
  const result = compareObjectsBasedOn(['a', 'b'], [base, check])
  t.deepEqual(result.differentProps, ['a', 'b'])
  t.deepEqual(result.differentPropsPicked, [{ a: 1, b: true }, {}])
  t.deepEqual(result.equal, false)
})

// I don't think I want this syntax because it's too complex:
// test('compareObjectsBasedOn - nested', () => {
//   const base = { nested: { a: 1, b: 2 } }
//   const check = { nested: { a: 1, b: 3 } }
//   const result = compareObjectsBasedOn(['nested.a', 'nested.b'] as any[], [base, check])
//   t.deepEqual(result.differentProps, ['nested.b'])
//   t.deepEqual(result.differentPropsPicked, [{ b: 2 }, { b: 3 }] as any)
//   t.deepEqual(result.equal, false)
// })

test('compareObjectsBasedOn - check nested props flat', () => {
  const base = { nested: { a: 1, b: 2 } }
  const check = { nested: { a: 1, b: 3 } }
  const result = compareObjectsBasedOn(['nested'], [base, check])
  t.deepEqual(result.differentProps, ['nested'])
  t.deepEqual(result.differentPropsPicked, [{ nested: { a: 1, b: 2 } }, { nested: { a: 1, b: 3 } }])
  t.deepEqual(result.equal, false)
})

test('compareObjectsBasedOn - check nested props flattened', () => {
  const base = { 'nested.deep.a': 1, 'nested.deep.b': 2 }
  const check = { 'nested.deep.a': 1, 'nested.deep.b': 3 }
  const result = compareObjectsBasedOn(['nested.deep.a', 'nested.deep.b'], [base, check])
  t.deepEqual(result.differentProps, ['nested.deep.b'])
  t.deepEqual(result.differentPropsPicked, [{ 'nested.deep.b': 2 }, { 'nested.deep.b': 3 }])
  t.deepEqual(result.equal, false)
})

test('compareObjectsBasedOn - ok', () => {
  const base = { a: 1, b: true, c: 'CC' }
  const check = { a: 1, c: 'CC', d: 1 }
  const result = compareObjectsBasedOn(['a', 'c'], [base, check])
  t.deepEqual(result.differentProps, [])
  t.deepEqual(result.differentPropsPicked, [{}, {}])
  t.deepEqual(result.equal, true)
})
