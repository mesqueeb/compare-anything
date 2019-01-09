import test from 'ava'
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
