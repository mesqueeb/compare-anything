import { isAnyObject, isArray, isNumber, isString } from 'is-what';

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
        if (!isAnyObject(object))
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
        presentInAll: null,
        presentIn: {},
        perValue: {}
    };
    params.forEach(function (array, index) {
        if (!isArray(array))
            throw new Error("'compareArrays' can only compare arrays");
        array.forEach(function (val) {
            valuesSet.add(val);
            var parsedVal = isNumber(val) || isString(val) ? String(val) : JSON.stringify(val);
            if (!(parsedVal in res.presentIn))
                res.presentIn[parsedVal] = [];
            res.presentIn[parsedVal].push(index);
            if (!(parsedVal in res.perValue))
                res.perValue[parsedVal] = [];
            res.perValue[parsedVal].push(array);
        });
    });
    var paramCount = params.length;
    res.presentInAll = Object.keys(res.presentIn).reduce(function (carry, prop) {
        var propCount = res.presentIn[prop].length;
        carry[prop] = propCount === paramCount;
        return carry;
    }, {});
    res.values = Array.from(valuesSet);
    return res;
}

export { compareArrays, compareObjectProps };
