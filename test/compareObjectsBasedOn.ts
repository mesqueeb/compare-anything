// @ts-check
import test from 'ava'
import { compareObjectsBasedOn } from '../src'

test('compareObjectsBasedOn', t => {
  const base = { a: 1, b: true, c: 'CC' }
  const check = { d: 1 }
  const result = compareObjectsBasedOn(['a', 'b'], [base, check])
  t.deepEqual(result.differentProps, ['a', 'b'])
  t.deepEqual(result.differentPropsPicked, [{ a: 1, b: true }, {}])
  t.deepEqual(result.equal, false)
})
