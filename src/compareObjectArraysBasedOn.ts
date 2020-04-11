import {
  ComparisonObjects,
  compareObjectsBasedOn
} from './compareObjectsBasedOn'
import { PlainObject } from './types'

export type ComparisonObjectArrays<ObjectType> = {
  perIndex: ComparisonObjects<ObjectType>[]
  equal: boolean
}

export function compareObjectArraysBasedOn<
  ObjectType extends PlainObject | any = PlainObject
> (
  propKeys: (keyof ObjectType)[],
  objectArrays: ObjectType[][]
): ComparisonObjectArrays<ObjectType> {
  const firstArray = objectArrays[0]
  const comparison: ComparisonObjectArrays<ObjectType> = {
    perIndex: [],
    equal: true
  }
  firstArray.forEach((object, index) => {
    const objectsToCompare: ObjectType[] = objectArrays.map(arr => arr[index])
    const compared = compareObjectsBasedOn(propKeys, objectsToCompare)
    if (!compared.equal) comparison.equal = false
    comparison.perIndex.push(compared)
  })
  return comparison
}
