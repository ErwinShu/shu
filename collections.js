const bindDomain = function(callback, context) {
    return context ? callback.bind(context) : callback;
}

const collections = {
    each: function(obj, callback, context) {
        const _callback = bindDomain(callback, context);
        if (obj instanceof Array) {
            for (let i = 0; i < obj.length; i++) {
              _callback(obj[i]);
            }
        } else {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
              _callback(obj[keys[i]]);
            }
        }
        return obj;
    },

    map: function(obj, callback, context) {
        const _callback = bindDomain(callback, context);
        if (obj instanceof Array) {
            let result = [];
            for (let i = 0; i < obj.length; i++) {
                result.push(_callback(obj[i]));
            }
            return result;
        } else {
            const keys = Object.keys(obj);
            const result = {};
            for (let i = 0; i < keys.length; i++) {
                result[keys[i]] = _callback(obj[keys[i]]);
            }
            return result;
        }
    }
};

collections.forEach = collections.each;

export default collections;
