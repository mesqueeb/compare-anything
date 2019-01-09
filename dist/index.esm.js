import { isPlainObject } from 'is-what';

function compareObjectProps() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var res = {
        props: new Set(),
        presentInAll: null,
        presentIn: {},
    };
    params.forEach(function (object, index) {
        if (!isPlainObject(object))
            return console.error('\'compareObjectProps\' can only compare objects');
        Object.keys(object).forEach(function (prop) {
            res.props.add(prop);
            if (!(prop in res.presentIn))
                res.presentIn[prop] = [];
            res.presentIn[prop].push(index);
        });
    });
    var paramCount = params.length;
    res.presentInAll = Object.keys(res.presentIn)
        .reduce(function (carry, prop) {
        var propCount = res.presentIn[prop].length;
        carry[prop] = (propCount === paramCount);
        return carry;
    }, {});
    // @ts-ignore
    res.props = Array.from(res.props);
    return res;
}

export { compareObjectProps };
