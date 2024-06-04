// @ts-check
import { expect, test } from 'vitest'
import { compareObjectsBasedOn } from '../src/index.js'

test('compareObjectsBasedOn', () => {
  const base = { a: 1, b: true, c: 'CC' }
  const check = { d: 1 }
  const result = compareObjectsBasedOn(['a', 'b'], [base, check])
  expect(result.differentProps).toEqual(['a', 'b'])
  expect(result.differentPropsPicked).toEqual([{ a: 1, b: true }, {}])
  expect(result.equal).toEqual(false)
})

// I don't think I want this syntax because it's too complex:
// test('compareObjectsBasedOn - nested', () => {
//   const base = { nested: { a: 1, b: 2 } }
//   const check = { nested: { a: 1, b: 3 } }
//   const result = compareObjectsBasedOn(['nested.a', 'nested.b'] as any[], [base, check])
//   expect(result.differentProps).toEqual( ['nested.b'])
//   expect(result.differentPropsPicked).toEqual( [{ b: 2 }, { b: 3 }] as any)
//   expect(result.equal).toEqual( false)
// })

test('compareObjectsBasedOn - check nested props flat', () => {
  const base = { nested: { a: 1, b: 2 } }
  const check = { nested: { a: 1, b: 3 } }
  const result = compareObjectsBasedOn(['nested'], [base, check])
  expect(result.differentProps).toEqual(['nested'])
  expect(result.differentPropsPicked).toEqual([
    { nested: { a: 1, b: 2 } },
    { nested: { a: 1, b: 3 } },
  ])
  expect(result.equal).toEqual(false)
})

test('compareObjectsBasedOn - check nested props flattened', () => {
  const base = { 'nested.deep.a': 1, 'nested.deep.b': 2 }
  const check = { 'nested.deep.a': 1, 'nested.deep.b': 3 }
  const result = compareObjectsBasedOn(['nested.deep.a', 'nested.deep.b'], [base, check])
  expect(result.differentProps).toEqual(['nested.deep.b'])
  expect(result.differentPropsPicked).toEqual([{ 'nested.deep.b': 2 }, { 'nested.deep.b': 3 }])
  expect(result.equal).toEqual(false)
})

test('compareObjectsBasedOn - ok', () => {
  const base = { a: 1, b: true, c: 'CC' }
  const check = { a: 1, c: 'CC', d: 1 }
  const result = compareObjectsBasedOn(['a', 'c'], [base, check])
  expect(result.differentProps).toEqual([])
  expect(result.differentPropsPicked).toEqual([{}, {}])
  expect(result.equal).toEqual(true)
})
