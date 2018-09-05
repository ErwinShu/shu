const _ = require('./shu.js');

const objects = {
  keys: function (object) {
    let result = [];
    for (item in object) {
      if (object.hasOwnProperty(item)) {
        result.push(item);
      }
    }
    return result;
  },

  allKeys: function (object) {
    let result = [];
    for (item in object) {
      result.push(item);
    }
    return result;
  },
  
  values: function(object) {
    let result = [];
    for (item in object) {
      if (object.hasOwnProperty(item)) {
        result.push(object[item]);
      }
    }
    return result;
  },
  
  mapObject: function (object, callback, context) {
    if (!callback) return object;
    const _callback = context ? callback.bind(context) : callback;
    let result = {};
    for (item in object) {
      if (object.hasOwnProperty(item)) {
        result[item] = _callback(object[item], item, object);
      }
    }
    return result;
  },

  pairs: function (object) {
    let result = [];
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        const item = [key, object[key]];
        result.push(item);
      }
    }
    return result;
  },

  invert: function(object) {
    let result = {};
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        result[object[key]] = key;
      }
    }
    return result;
  },

  create: function(prototype, props) {
    const ctor = function () { };
    ctor.prototype = prototype;
    const result = new ctor;
    if (props) {
      _.each(props, (value, key) => {
        result[key] = value;
      });
    }
    return result;
  },

  functions: function(obj) {
    let result = [];
    for (key in obj) {
      if (typeof obj[key] === 'function') {
        result.push(key);
      }
    }
    return _.sort(result);
  },

  findKey: function(obj, callback, context) {
    if (!(_.Object(obj)) || !(_.isFunction(callback))) return undefined;
    const _callback = context ? callback.bind(context) : callback;
    let result;
    for (key in obj) {
      if (obj.hasOwnProperty(key) && _callback(obj[key], key, obj)) {
        return key;
      };
    }
    return result;
  },

  extend: function(obj, ...rest) {
    for (item of rest) {
      if (_.isObject(item)) {
        for (key in item) {
          obj[key] = item[key];
        }
      }
    }
    return obj;
  },

  extendOwn: function(obj, ...rest) {
    for (item of rest) {
      if (_.isObject(item)) {
        _.each(item, (value, key) => {
          obj[key] = value;
        });
      }
    }
    return obj;
  },

  pick: function (obj, ...rest) {
    const result = {};
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fit = _.isFunction(rest[0]) ? rest[0](obj[key], key, obj) : _.contains(rest, key);
        if (fit) {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },

  omit: function(obj, ...rest) {
    const result = {};
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fit = _.isFunction(rest[0]) ? !rest[0](obj[key], key, obj) : !_.contains(rest, key);
        if (fit) {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },

  defaults: function() {
    for (item of rest) {
      if (_.isObject(item)) {
        _.each(item, (value, key) => {
          if (!obj.hasOwnProperty(key)) {
            obj[key] = value;
          }
        });
      }
    }
    return obj;
  },

  clone: function(ele) {
    if (_.isArray(ele)) {
      return [...ele];
    } else if (_.isObject) {
      return _.extend({}, ele);
    } else {
      return ele;
    }
  },

  tap: function() {

  },

  has: function (obj, key) {
    if (_.isArray(key)) {
      for (item of key) {
        if (!Object.prototype.hasOwnProperty.call(obj, item)) {
          return false;
        }
      }
      return true;
    } else {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  },

  property: function(path) {
    if (_.isArray(path)) {
      return (obj) => {
        let result = obj;
        for (key of path) {
          result = result[key];
          if (!result) return result; 
        }
        return result;
      }
    } else {
      return obj => obj[path];
    }
  },

  propertyOf: function(obj) {
    return (path) => {
      if (_.isArray(path)) {
        let result = obj;
        for (key of path) {
          result = result[key];
          if (!result) return result;
        }
        return result;
      }
    }
  },

  matcher: function(other) {
    return (obj) => {
      return _.isMatch(obj, other);
    };
  },

  isEqual: function(obj, other) {
    if (_.isArray(obj)) {
      if (obj.length !== other.length) return false;
      for (let i = 0; i < obj.length; i++) {
        if (!_.isEqual(obj[i], other[i])) return false;
      }
      return true;
    } else if (_.isObject(obj)) {
      const objKeys = _.keys(obj);
      const otherKeys = _.keys(other);
      if (objKeys.length !== otherKeys.length) return false;
      for (key of objKeys) {
        if (!_.isEqual(obj[key], other[key])) return false;
      }
      return true;
    } else {
      return obj === other;
    }
  },

  isMatch: function (obj, other) {
    if (!_.isObject(other)) return false;
    const keyList = _.keys(other);
    for (key of keyList) {
      if (!(obj[key] === other[key])) return false;
    }
    return true;
  },

  isEmpty: function(ele) {
    if (_.isArray(ele)) {
      return !ele.length;
    } else if (_.isObject(ele)) {
      return !_.keys(ele).length;
    } else {
      return !ele;
    }
  },

  isElement: function(ele) {
    return _.contains(Object.prototype.toString.call(ele), 'HTML');
  },

  isArray: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Array]';
  },

  isObject: function(ele) { // 这个函数和underscore不同，只识别obj
    return Object.prototype.toString.call(ele) === '[object Object]';
  },

  isArguments: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Arguments]';
  },

  isFunction: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Function]';
  },

  isString: function(ele) {
    return Object.prototype.toString.call(ele) === '[object String]';
  },

  isNumber: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Number]';
  },

  isFinite: function(ele) {
    if (_.isNumber(ele)) {
      return ele !== Infinity && ele !== -Infinity;
    } else {
      return false;
    }
  },

  isBoolean: function(eleele) {
    return Object.prototype.toString.call(ele) === '[object Boolean]';
  },

  isDate: function(eleele) {
    return Object.prototype.toString.call(ele) === '[object Date]';
  },

  isRegExp: function(ele) {
    return Object.prototype.toString.call(ele) === '[object RegExp]';
  },

  isError: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Error]';
  },

  isSymbol: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Symbol]';
  },

  isMap: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Map]';
  },

  isWeakMap: function(ele) {
    return Object.prototype.toString.call(ele) === '[object WeakMap]';
  },

  isSet: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Set]';
  },

  isWeakSet: function(ele) {
    return Object.prototype.toString.call(ele) === '[object WeakSet]';
  },

  isNaN: function(ele) {
    return Number.isNaN(ele);
  },

  isNull: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Null]';
  },

  isUndefined: function(ele) {
    return Object.prototype.toString.call(ele) === '[object Undefined]';
  },

};

export default objects;
