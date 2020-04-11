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
  objects: ObjectType[]
): ComparisonObjects<ObjectType> {
  const baseProps = propKeys
  const baseObject = objects[0]
  const differentPropsSet: Set<string> = objects.reduce(
    (carry, object, index) => {
      if (index === 0) return carry
      for (const prop of baseProps) {
        if (object[prop] !== baseObject[prop]) carry.add(prop as string)
      }
      return carry
    },
    new Set() as Set<string>
  )
  const differentProps = [...differentPropsSet]
  const differentPropsPicked: Partial<ObjectType>[] = objects.map(object =>
    pick(object as any, differentProps)
  ) as any[]
  return {
    differentProps,
    differentPropsPicked,
    equal: differentProps.length === 0
  }
}
