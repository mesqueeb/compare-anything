import { pick } from 'filter-anything'
import { PlainObject } from './types'

export type ComparisonObjects<ObjectType> = {
  differentProps: (keyof ObjectType)[]
  differentPropsPicked: Partial<ObjectType>[]
  equal: boolean
}

export function compareObjectsBasedOn<
  ObjectType extends PlainObject | any = PlainObject
> (
  propKeys: (keyof ObjectType)[],
  objects: [ObjectType, ...any[]]
): ComparisonObjects<ObjectType> {
  type PropKeys = keyof ObjectType
  const baseProps = propKeys
  const baseObject = objects[0]
  const differentPropsSet: Set<PropKeys> = objects.reduce(
    (carry, object, index) => {
      if (index === 0) return carry
      for (const prop of baseProps) {
        if (object[prop] !== baseObject[prop]) carry.add(prop)
      }
      return carry
    },
    new Set() as Set<PropKeys>
  )
  const differentProps = [...differentPropsSet]
  const differentPropsPicked = objects.map(object =>
    pick(object, differentProps as string[])
  ) as Partial<ObjectType>[]
  return {
    differentProps,
    differentPropsPicked,
    equal: differentProps.length === 0
  }
}
