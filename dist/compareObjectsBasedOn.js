import { pick } from 'filter-anything';
export function compareObjectsBasedOn(propKeys, objects) {
    const baseProps = propKeys;
    const baseObject = objects[0];
    const differentPropsSet = objects.reduce((carry, object, index) => {
        if (index === 0)
            return carry;
        for (const prop of baseProps) {
            if (object[prop] !== baseObject[prop])
                carry.add(prop);
        }
        return carry;
    }, new Set());
    const differentProps = [...differentPropsSet];
    const differentPropsPicked = objects.map((object) => pick(object, differentProps));
    return {
        differentProps,
        differentPropsPicked,
        equal: differentProps.length === 0,
    };
}
