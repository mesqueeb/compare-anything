import { isAnyObject, isArray, isString, isNumber } from 'is-what'

type plainObject = { [key: string]: any }

export function compareObjectProps (
  ...params: plainObject[]
): {
  props: string[]
  presentInAll: { [prop: string]: boolean }
  perProp: { [prop: string]: plainObject }
  presentIn: { [prop: string]: number[] }
} {
  const propsSet = new Set()
  const res = {
    props: null,
    presentInAll: null,
    presentIn: {},
    perProp: {}
  }
  params.forEach((object, index) => {
    if (!isAnyObject(object))
      throw new Error("'compareObjectProps' can only compare objects")
    Object.keys(object).forEach(prop => {
      propsSet.add(prop)
      if (!(prop in res.presentIn)) res.presentIn[prop] = []
      res.presentIn[prop].push(index)
      if (!(prop in res.perProp)) res.perProp[prop] = []
      res.perProp[prop].push(object)
    })
  })
  const paramCount = params.length
  res.presentInAll = Object.keys(res.presentIn).reduce((carry, prop) => {
    const propCount = res.presentIn[prop].length
    carry[prop] = propCount === paramCount
    return carry
  }, {})
  res.props = Array.from(propsSet)
  return res
}

export function compareArrays (
  ...params: any[][]
): {
  values: any[]
  presentInAll: { [prop: string]: boolean }
  perValue: { [prop: string]: plainObject }
  presentIn: { [prop: string]: number[] }
} {
  const valuesSet = new Set()
  const res = {
    values: null,
    presentInAll: null,
    presentIn: {},
    perValue: {}
  }
  params.forEach((array, index) => {
    if (!isArray(array))
      throw new Error("'compareArrays' can only compare arrays")
    array.forEach(val => {
      valuesSet.add(val)
      const parsedVal =
        isNumber(val) || isString(val) ? String(val) : JSON.stringify(val)
      if (!(parsedVal in res.presentIn)) res.presentIn[parsedVal] = []
      res.presentIn[parsedVal].push(index)
      if (!(parsedVal in res.perValue)) res.perValue[parsedVal] = []
      res.perValue[parsedVal].push(array)
    })
  })
  const paramCount = params.length
  res.presentInAll = Object.keys(res.presentIn).reduce((carry, prop) => {
    const propCount = res.presentIn[prop].length
    carry[prop] = propCount === paramCount
    return carry
  }, {})
  res.values = Array.from(valuesSet)
  return res
}
