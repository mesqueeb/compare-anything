import { isAnyObject, isArray, isString, isNumber } from 'is-what'

export { compareObjectsBasedOn } from './compareObjectsBasedOn'
export { compareObjectArraysBasedOn } from './compareObjectArraysBasedOn'

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
    if (!isAnyObject(object)) {
      throw new Error("'compareObjectProps' can only compare objects")
    }
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
  infoPerValue: {
    [prop: string]: {
      indexPerArray: (number | undefined)[]
      presentInAll: boolean
    }
  }
  presentInAll: any[]
} {
  const valuesSet = new Set()
  const res: {
    values: null | any[]
    infoPerValue: {
      [val: string]: {
        indexPerArray: (number | undefined)[]
        presentInAll: boolean
      }
    }
    presentInAll: string[]
  } = {
    values: null,
    infoPerValue: {},
    presentInAll: []
  }
  const getEmptyArray = (): undefined[] => params.map(() => undefined)
  params.forEach((array, paramIndex) => {
    if (!isArray(array))
      throw new Error("'compareArrays' can only compare arrays")
    array.forEach((val, valIndex) => {
      valuesSet.add(val)
      const parsedVal =
        isNumber(val) || isString(val) ? String(val) : JSON.stringify(val)
      if (!(parsedVal in res.infoPerValue)) {
        res.infoPerValue[parsedVal] = {
          indexPerArray: getEmptyArray(),
          presentInAll: false
        }
      }
      res.infoPerValue[parsedVal].indexPerArray[paramIndex] = valIndex
    })
  })
  Object.entries(res.infoPerValue).forEach(([parsedVal, info]) => {
    const isInAllArrays =
      info.indexPerArray.every(index => isNumber(index) && index >= 0) &&
      info.indexPerArray.length === params.length
    info.presentInAll = isInAllArrays
    if (isInAllArrays) res.presentInAll.push(parsedVal)
  })
  res.values = Array.from(valuesSet)
  return res
}
