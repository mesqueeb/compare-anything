import { compareObjectsBasedOn } from './compareObjectsBasedOn.js';
export function compareObjectArraysBasedOn(propKeys, objectArrays) {
    const firstArray = objectArrays[0];
    const comparison = {
        perIndex: [],
        equal: true,
    };
    firstArray.forEach((object, index) => {
        const objectsToCompare = objectArrays.map((arr) => arr[index]);
        const compared = compareObjectsBasedOn(propKeys, objectsToCompare);
        if (!compared.equal)
            comparison.equal = false;
        comparison.perIndex.push(compared);
    });
    return comparison;
}
