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
      _.mapObject(props, (value, key) => {
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

  },

  extend: function() {

  },

  extendOwn: function() {

  },

  pick: function() {

  },

  omit: function() {

  },

  defaults: function() {

  },

  clone: function() {

  },

  tap: function() {

  },

  has: function() {

  },

  property: function() {

  },

  propertyOf: function() {

  },

  matcher: function() {

  },

  isEqual: function() {

  },

  isMatch: function() {

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

  isObject: function(ele) {
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
