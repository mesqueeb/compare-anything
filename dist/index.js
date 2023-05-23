import { isAnyObject, isArray, isNumber, isString } from 'is-what';
import { pick } from 'filter-anything';

function compareObjectsBasedOn(propKeys, objects) {
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
  }, /* @__PURE__ */ new Set());
  const differentProps = [...differentPropsSet];
  const differentPropsPicked = objects.map(
    (object) => pick(object, differentProps)
  );
  return {
    differentProps,
    differentPropsPicked,
    equal: differentProps.length === 0
  };
}

function compareObjectArraysBasedOn(propKeys, objectArrays) {
  const firstArray = objectArrays[0];
  const comparison = {
    perIndex: [],
    equal: true
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

function compareObjectProps(...params) {
  const propsSet = /* @__PURE__ */ new Set();
  const res = {
    props: [],
    presentInAll: {},
    presentIn: {},
    perProp: {}
  };
  params.forEach((object, index) => {
    if (!isAnyObject(object)) {
      throw new Error("'compareObjectProps' can only compare objects");
    }
    Object.keys(object).forEach((prop) => {
      propsSet.add(prop);
      if (!(prop in res.presentIn))
        res.presentIn[prop] = [];
      res.presentIn[prop].push(index);
      if (!(prop in res.perProp))
        res.perProp[prop] = [];
      res.perProp[prop].push(object);
    });
  });
  const paramCount = params.length;
  res.presentInAll = Object.keys(res.presentIn).reduce((carry, prop) => {
    const propCount = res.presentIn[prop].length;
    carry[prop] = propCount === paramCount;
    return carry;
  }, {});
  res.props = Array.from(propsSet);
  return res;
}
function compareArrays(...params) {
  const valuesSet = /* @__PURE__ */ new Set();
  const res = {
    values: [],
    infoPerValue: {},
    presentInAll: []
  };
  const getEmptyArray = () => params.map(() => void 0);
  params.forEach((array, paramIndex) => {
    if (!isArray(array))
      throw new Error("'compareArrays' can only compare arrays");
    array.forEach((val, valIndex) => {
      valuesSet.add(val);
      const parsedVal = isNumber(val) || isString(val) ? String(val) : JSON.stringify(val);
      if (!(parsedVal in res.infoPerValue)) {
        res.infoPerValue[parsedVal] = {
          indexPerArray: getEmptyArray(),
          presentInAll: false
        };
      }
      res.infoPerValue[parsedVal].indexPerArray[paramIndex] = valIndex;
    });
  });
  Object.entries(res.infoPerValue).forEach(([parsedVal, info]) => {
    const isInAllArrays = info.indexPerArray.every((index) => isNumber(index) && index >= 0) && info.indexPerArray.length === params.length;
    info.presentInAll = isInAllArrays;
    if (isInAllArrays)
      res.presentInAll.push(parsedVal);
  });
  res.values = Array.from(valuesSet);
  return res;
}

export { compareArrays, compareObjectArraysBasedOn, compareObjectProps, compareObjectsBasedOn };
