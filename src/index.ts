import { isAnyObject } from 'is-what'

export function compareObjectProps (...params: object[]) {
  const res = {
    props: new Set(),
    presentInAll: null,
    presentIn: {},
    perProp: {},
  }
  params.forEach((object, index) => {
    if (!isAnyObject(object)) return console.error('\'compareObjectProps\' can only compare objects')
    Object.keys(object).forEach(prop => {
      res.props.add(prop)
      if (!(prop in res.presentIn)) res.presentIn[prop] = []
      res.presentIn[prop].push(index)
      if (!(prop in res.perProp)) res.perProp[prop] = []
      res.perProp[prop].push(object)
    })
  })
  const paramCount = params.length
  res.presentInAll = Object.keys(res.presentIn)
    .reduce((carry, prop) => {
      const propCount = res.presentIn[prop].length
      carry[prop] = (propCount === paramCount)
      return carry
    }, {})
  // @ts-ignore
  res.props = Array.from(res.props)
  return res
}
