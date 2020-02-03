'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isWhat = require('is-what');

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
        if (!isWhat.isAnyObject(object))
            throw new Error("'compareObjectProps' can only compare objects");
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
        var parsedVal = _a[0], info = _a[1];
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
exports.compareObjectProps = compareObjectProps;
