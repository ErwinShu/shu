const collections = {
    each: function(obj, callback, context) {
        const _callback = context ? callback.bind(context) : callback;
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
        const _callback = context ? callback.bind(context) : callback;
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
    },,

    reduce: function (obj, callback, initialValue, context) {
      const _callback = context ? callback.bind(context) : callback;
      if (obj instanceof Array) {
        if (obj.length <= 1) return obj;
        let result = initialValue || obj[0];
        for (let i = initialValue ? 0 : 1; i < obj.length; i++) {
          result = _callback(result, obj[i], i, obj);
        }
        return result;
      } else {
        const keys = Object.keys(obj);
        if (keys.length <= 1) return obj;
        let result = initialValue || obj[keys[0]];
        for (let i = initialValue ? 0 : 1; i < keys.length; i++) {
          result = _callback(result, obj[keys[i]], keys[i], obj);
        }
        return result;
      }
    },

    reduceRight: function (obj, callback, initialValue, context) {
      const _callback = context ? callback.bind(context) : callback;
      if (obj instanceof Array) {
        const length = obj.length;
        if (length <= 1) return obj;
        let result = initialValue || obj[length - 1];
        for (let i = initialValue ? length - 1 : length - 2; i > -1; i--) {
          result = _callback(result, obj[i], i, obj);
        }
        return result;
      } else {
        const keys = Object.keys(obj);
        const length = keys.length;
        if (length <= 1) return obj;
        let result = initialValue || obj[keys[length - 1]];
        for (let i = initialValue ? length - 1 : length - 2; i > -1; i--) {
          result = _callback(result, obj[keys[i]], keys[i], obj);
        }
        return result;
      }
    },

    find: function (obj, callback, context) {
      const _callback = context ? callback.bind(context) : callback;
      if (obj instanceof Array) {
        for (let i = 0; i < obj.length; i++) {
          if (_callback(obj[i], i, obj)) {
            return obj[i];
          }
        }
      } else {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          if (_callback(obj[keys[i]], keys[i], obj)) {
            return obj[keys[i]];
          }
        }
      }
    },

    filter: function (obj, callback, context) {
      const _callback = context ? callback.bind(context) : callback;
      if (obj instanceof Array) {
        let result = [];
        for (let i = 0; i < obj.length; i++) {
          if (_callback(obj[i], i, obj)) {
            result.push(obj[i]);
          }
        }
        return result;
      } else {
        const result = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          if (_callback(obj[keys[i]], keys[i], obj)) {
            result[keys[i]] = obj[keys[i]];
          }
        }
        return result;
      }
    },

    where: function (list, option) {
      if (!(list instanceof Array)) return [];
      let result = [];
      const check = function (obj, opt) {
        const keys = Object.keys(opt);
        for (let i = 0; i < keys.length; i++) {
          if (obj[keys[i]] !== opt[keys[i]]) {
            return false;
          }
        }
        return true;
      }
      for (let i = 0; i < list.length; i++) {
        if (check(list[i], option)) {
          result.push(list[i]);
        }
      }
      return result;
    },

    findWhere: function (list, option) {
      if (!(list instanceof Array)) return;
      for (let i = 0; i < list.length; i++) {
        const keys = Object.keys(option);
        for (let i = 0; i < keys.length; i++) {
          if (list[i][keys[i]] === option[keys[i]]) {
            return list[i];
          }
        }
      }
    },

    reject: function (obj, callback, context) {
      const _callback = context ? callback.bind(context) : callback;
      if (obj instanceof Array) {
        let result = [];
        for (let i = 0; i < obj.length; i++) {
          if (!_callback(obj[i], i, obj)) {
            result.push(obj[i]);
          }
        }
        return result;
      } else {
        const result = {};
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          if (!_callback(obj[keys[i]], keys[i], obj)) {
            result[keys[i]] = obj[keys[i]];
          }
        }
        return result;
      }
    },

    every: function (obj, callback, context) {
      const _callback = context ? callback.bind(context) : callback;
      if (obj instanceof Array) {
        for (let i = 0; i < obj.length; i++) {
          if (!_callback(obj[i], i, obj)) {
            return false;
          }
        }
        return true;
      } else {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          if (!_callback(obj[keys[i]], keys[i], obj)) {
            return false;
          }
        }
        return true;
      }
    },

    some: function (obj, callback, context) {
      const _callback = context ? callback.bind(context) : callback;
      if (obj instanceof Array) {
        for (let i = 0; i < obj.length; i++) {
          if (_callback(obj[i], i, obj)) {
            return true;
          }
        }
        return false;
      } else {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          if (_callback(obj[keys[i]], keys[i], obj)) {
            return true;
          }
        }
        return false;
      }
    },

    contains: function (list, value) {
      if (!(list instanceof Array)) return false;
      for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
          return true;
        }
      }
      return false;
    },

    invoke: function (list, callback, argument) {

    },

    pluck: function (list, key) {
      if (!(list instanceof Array)) return [];
      let result = [];
      for (let value of list) {
        if (typeof value === 'object') {
          result.push(value[key]);
        } else {
          result.push(undefined);
        }
      }
      return result;
    },

    max: function (list, callback) {

    },
};

collections.forEach = collections.each;

export default collections;
