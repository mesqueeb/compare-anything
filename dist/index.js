import { isAnyObject, isArray, isNumber, isString } from 'is-what';
export { compareObjectArraysBasedOn } from './compareObjectArraysBasedOn.js';
export { compareObjectsBasedOn } from './compareObjectsBasedOn.js';
export function compareObjectProps(...params) {
    const propsSet = new Set();
    const res = {
        props: [],
        presentInAll: {},
        presentIn: {},
        perProp: {},
    };
    params.forEach((object, index) => {
        if (!isAnyObject(object)) {
            throw new Error("'compareObjectProps' can only compare objects");
        }
        Object.keys(object).forEach((prop) => {
            propsSet.add(prop);
            if (!(prop in res.presentIn))
                res.presentIn[prop] = [];
            res.presentIn[prop]?.push(index);
            if (!(prop in res.perProp))
                res.perProp[prop] = [];
            res.perProp[prop]?.['push'](object);
        });
    });
    const paramCount = params.length;
    res.presentInAll = Object.keys(res.presentIn).reduce((carry, prop) => {
        const propCount = res.presentIn[prop]?.length;
        carry[prop] = propCount === paramCount;
        return carry;
    }, {});
    res.props = Array.from(propsSet);
    return res;
}
export function compareArrays(...params) {
    const valuesSet = new Set();
    const res = {
        values: [],
        infoPerValue: {},
        presentInAll: [],
    };
    const getEmptyArray = () => params.map(() => undefined);
    params.forEach((array, paramIndex) => {
        if (!isArray(array))
            throw new Error("'compareArrays' can only compare arrays");
        array.forEach((val, valIndex) => {
            valuesSet.add(val);
            const parsedVal = isNumber(val) || isString(val) ? String(val) : JSON.stringify(val);
            if (!(parsedVal in res.infoPerValue)) {
                res.infoPerValue[parsedVal] = {
                    indexPerArray: getEmptyArray(),
                    presentInAll: false,
                };
            }
            const v = res.infoPerValue[parsedVal];
            if (v)
                v.indexPerArray[paramIndex] = valIndex;
        });
    });
    Object.entries(res.infoPerValue).forEach(([parsedVal, info]) => {
        const isInAllArrays = info.indexPerArray.every((index) => isNumber(index) && index >= 0) &&
            info.indexPerArray.length === params.length;
        info.presentInAll = isInAllArrays;
        if (isInAllArrays)
            res.presentInAll.push(parsedVal);
    });
    res.values = Array.from(valuesSet);
    return res;
}
