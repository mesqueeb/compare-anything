import { ComparisonObjects, compareObjectsBasedOn } from './compareObjectsBasedOn'

export type ComparisonObjectArrays<ObjectType> = {
  perIndex: ComparisonObjects<ObjectType>[]
  equal: boolean
}

export function compareObjectArraysBasedOn<
  ObjectType extends Record<string, any> | any = Record<string, any>
>(
  propKeys: (keyof ObjectType)[],
  objectArrays: [[ObjectType, ...any[]], ...any[]]
): ComparisonObjectArrays<ObjectType> {
  const firstArray = objectArrays[0]
  const comparison: ComparisonObjectArrays<ObjectType> = {
    perIndex: [],
    equal: true,
  }
  firstArray.forEach((object, index) => {
    const objectsToCompare = objectArrays.map((arr) => arr[index])
    const compared = compareObjectsBasedOn(propKeys, objectsToCompare as any)
    if (!compared.equal) comparison.equal = false
    comparison.perIndex.push(compared)
  })
  return comparison
}
