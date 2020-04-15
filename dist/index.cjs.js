'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isWhat = require('is-what');
var filterAnything = require('filter-anything');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
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
        return filterAnything.pick(object, differentProps);
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
        if (!isWhat.isAnyObject(object)) {
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
        if (!isWhat.isArray(array))
            throw new Error("'compareArrays' can only compare arrays");
        array.forEach(function (val, valIndex) {
            valuesSet.add(val);
            var parsedVal = isWhat.isNumber(val) || isWhat.isString(val) ? String(val) : JSON.stringify(val);
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
        var isInAllArrays = info.indexPerArray.every(function (index) { return isWhat.isNumber(index) && index >= 0; }) &&
            info.indexPerArray.length === params.length;
        info.presentInAll = isInAllArrays;
        if (isInAllArrays)
            res.presentInAll.push(parsedVal);
    });
    res.values = Array.from(valuesSet);
    return res;
}

exports.compareArrays = compareArrays;
exports.compareObjectArraysBasedOn = compareObjectArraysBasedOn;
exports.compareObjectProps = compareObjectProps;
exports.compareObjectsBasedOn = compareObjectsBasedOn;
