import { isAnyObject, isArray, isNumber, isString } from 'is-what';
import { pick } from 'filter-anything';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function compareObjectsBasedOn(propKeys, objects) {
    var baseProps = propKeys;
    var baseObject = objects[0];
    var differentPropsSet = objects.reduce(function (carry, object, index) {
        var e_1, _a;
        if (index === 0)
            return carry;
        try {
            for (var baseProps_1 = __values(baseProps), baseProps_1_1 = baseProps_1.next(); !baseProps_1_1.done; baseProps_1_1 = baseProps_1.next()) {
                var prop = baseProps_1_1.value;
                if (object[prop] !== baseObject[prop])
                    carry.add(prop);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (baseProps_1_1 && !baseProps_1_1.done && (_a = baseProps_1.return)) _a.call(baseProps_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return carry;
    }, new Set());
    var differentProps = __spread(differentPropsSet);
    var differentPropsPicked = objects.map(function (object) {
        return pick(object, differentProps);
    });
    return {
        differentProps: differentProps,
        differentPropsPicked: differentPropsPicked,
        equal: differentProps.length === 0
    };
}

function compareObjectArraysBasedOn(propKeys, objectArrays) {
    var firstArray = objectArrays[0];
    var comparison = {
        perIndex: [],
        equal: true
    };
    firstArray.forEach(function (object, index) {
        var objectsToCompare = objectArrays.map(function (arr) { return arr[index]; });
        var compared = compareObjectsBasedOn(propKeys, objectsToCompare);
        if (!compared.equal)
            comparison.equal = false;
        comparison.perIndex.push(compared);
    });
    return comparison;
}

function compareObjectProps() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var propsSet = new Set();
    var res = {
        props: null,
        presentInAll: null,
        presentIn: {},
        perProp: {}
    };
    params.forEach(function (object, index) {
        if (!isAnyObject(object)) {
            throw new Error("'compareObjectProps' can only compare objects");
        }
        Object.keys(object).forEach(function (prop) {
            propsSet.add(prop);
            if (!(prop in res.presentIn))
                res.presentIn[prop] = [];
            res.presentIn[prop].push(index);
            if (!(prop in res.perProp))
                res.perProp[prop] = [];
            res.perProp[prop].push(object);
        });
    });
    var paramCount = params.length;
    res.presentInAll = Object.keys(res.presentIn).reduce(function (carry, prop) {
        var propCount = res.presentIn[prop].length;
        carry[prop] = propCount === paramCount;
        return carry;
    }, {});
    res.props = Array.from(propsSet);
    return res;
}
function compareArrays() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var valuesSet = new Set();
    var res = {
        values: null,
        infoPerValue: {},
        presentInAll: []
    };
    var getEmptyArray = function () { return params.map(function () { return undefined; }); };
    params.forEach(function (array, paramIndex) {
        if (!isArray(array))
            throw new Error("'compareArrays' can only compare arrays");
        array.forEach(function (val, valIndex) {
            valuesSet.add(val);
            var parsedVal = isNumber(val) || isString(val) ? String(val) : JSON.stringify(val);
            if (!(parsedVal in res.infoPerValue)) {
                res.infoPerValue[parsedVal] = {
                    indexPerArray: getEmptyArray(),
                    presentInAll: false
                };
            }
            res.infoPerValue[parsedVal].indexPerArray[paramIndex] = valIndex;
        });
    });
    Object.entries(res.infoPerValue).forEach(function (_a) {
        var _b = __read(_a, 2), parsedVal = _b[0], info = _b[1];
        var isInAllArrays = info.indexPerArray.every(function (index) { return isNumber(index) && index >= 0; }) &&
            info.indexPerArray.length === params.length;
        info.presentInAll = isInAllArrays;
        if (isInAllArrays)
            res.presentInAll.push(parsedVal);
    });
    res.values = Array.from(valuesSet);
    return res;
}

export { compareArrays, compareObjectArraysBasedOn, compareObjectProps, compareObjectsBasedOn };
