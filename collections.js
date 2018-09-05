const _ = require('./shu.js');

const collections = {
  each: function(obj, callback, context) {
    const _callback = context ? callback.bind(context) : callback;
    if (_.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        _callback(obj[i], i, obj);
      }
    } else {
      const keys = _.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        _callback(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  },

  map: function(obj, callback, context) {
    if (!callback) return obj;
    const _callback = context ? callback.bind(context) : callback;
    if (_.isArray(obj)) {
      let result = [];
      for (let i = 0; i < obj.length; i++) {
        result.push(_callback(obj[i], i, obj));
      }
      return result;
    } else {
      const keys = _.keys(obj);
      const result = {};
      for (let i = 0; i < keys.length; i++) {
        result[keys[i]] = _callback(obj[keys[i]], keys[i], obj);
      }
      return result;
    }
  },

  reduce: function (obj, callback, initialValue, context) {
    const _callback = context ? callback.bind(context) : callback;
    if (_.isArray(obj)) {
      if (obj.length <= 1) return obj;
      let result = initialValue || obj[0];
      for (let i = initialValue ? 0 : 1; i < obj.length; i++) {
        result = _callback(result, obj[i], i, obj);
      }
      return result;
    } else {
      const keys = _.keys(obj);
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
    if (_.isArray(obj)) {
      const length = obj.length;
      if (length <= 1) return obj;
      let result = initialValue || obj[length - 1];
      for (let i = initialValue ? length - 1 : length - 2; i > -1; i--) {
        result = _callback(result, obj[i], i, obj);
      }
      return result;
    } else {
      const keys = _.keys(obj);
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
    if (_.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (_callback(obj[i], i, obj)) {
          return obj[i];
        }
      }
    } else {
      const keys = _.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        if (_callback(obj[keys[i]], keys[i], obj)) {
          return obj[keys[i]];
        }
      }
    }
  },

  filter: function (obj, callback, context) {
    const _callback = context ? callback.bind(context) : callback;
    if (_.isArray(obj)) {
      let result = [];
      for (let i = 0; i < obj.length; i++) {
        if (_callback(obj[i], i, obj)) {
          result.push(obj[i]);
        }
      }
      return result;
    } else {
      const result = {};
      const keys = _.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        if (_callback(obj[keys[i]], keys[i], obj)) {
          result[keys[i]] = obj[keys[i]];
        }
      }
      return result;
    }
  },

  where: function (list, option) {
    if (!(_.isArray(list))) return [];
    let result = [];
    const check = function (obj, opt) {
      const keys = _.keys(opt);
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
    if (!(_.isArray(list))) return;
    for (let i = 0; i < list.length; i++) {
      const keys = _.keys(option);
      for (let i = 0; i < keys.length; i++) {
        if (list[i][keys[i]] === option[keys[i]]) {
          return list[i];
        }
      }
    }
  },

  reject: function (obj, callback, context) {
    const _callback = context ? callback.bind(context) : callback;
    if (_.isArray(obj)) {
      let result = [];
      for (let i = 0; i < obj.length; i++) {
        if (!_callback(obj[i], i, obj)) {
          result.push(obj[i]);
        }
      }
      return result;
    } else {
      const result = {};
      const keys = _.keys(obj);
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
    if (_.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (!_callback(obj[i], i, obj)) {
          return false;
        }
      }
      return true;
    } else {
      const keys = _.keys(obj);
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
    if (_.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (_callback(obj[i], i, obj)) {
          return true;
        }
      }
      return false;
    } else {
      const keys = _.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        if (_callback(obj[keys[i]], keys[i], obj)) {
          return true;
        }
      }
      return false;
    }
  },

  contains: function (list, value) {
    if (!(_.isArray(list))) return false;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === value) {
        return true;
      }
    }
    return false;
  },

  invoke: function (list, callback, ...argument) {
    if (!_.isObject(list)) return [];
    const result = _.map(list, function(item) {
      const _callback = _.isFunction(callback) ? callback : item[callback];
      return _callback && _callback.call(item, ...argument);
    });
    return result;
  },

  pluck: function (list, key) {
    if (!(_.isArray(list))) return [];
    let result = [];
    for (let value of list) {
      result.push(value[key]);
    }
    return result;
  },

  max: function (list, callback, context) {
    let _callback = context ? callback.bind(context) : callback;
    if (!_callback) {
      _callback = item => item;
    }
    let result = -Infinity;
    for (let i = 0; i < list.length; i++) {
      const value = _callback(list[i], i, list);
      if (value > result) {
        result = value;
      }
    }
    return result;
  },

  min: function (list, callback, context) {
    let _callback = context ? callback.bind(context) : callback;
    if (!_callback) {
      _callback = item => item;
    }
    let result = Infinity;
    for (let i = 0; i < list.length; i++) {
      const value = _callback(list[i], i, list);
      if (value < result) {
        result = value;
      }
    }
    return result;
  },

  sortBy: function (list, callback, context) {
    if (!(_.isArray(list))) return [];
    const _callback = callback || ((a, b) => a < b);
    const __callback = context ? _callback.bind(context) : _callback;
    const _list = [...list];
    function sort(array, left, right, func) {
      if (left >= right) return null;
      const base = array[right];
      let index = left;
      for (let i = left; i < right; i++) {
        if (func(array[i], base)) {
          [array[index], array[i]] = [array[i], array[index]];
          index++;
        }
      }
      [array[index], array[right]] = [array[right], array[index]];
      sort(array, left, index - 1, func);
      sort(array, index + 1, right, func);
    }
    sort(_list, 0, list.length - 1, __callback);
    return _list;
  },

  groupBy: function (list, callback, context) {
    let _callback = context ? callback.bind(context) : callback;
    if (!(_.isArray(list))) {
      return {};
    } else if (_.isString(_callback)) {
      _callback = (item) => {
        if (_.isObject(item)) {
          return item[callback];
        }
      }
    }
    let result = {};
    for (let i = 0; i < list.length; i++) {
      const key = _callback(list[i], i, list);
      if (result[key]) {
        result[key] = [...result[key], list[i]];
      } else {
        result[key] = [list[i]];
      }
    }
    return result;
  },

  indexBy: function (list, callback, context) {
    let _callback = context ? callback.bind(context) : callback;
    if (!(_.isArray(list))) {
      return {};
    } else if (_.isString(_callback)) {
      _callback = (item) => {
        if (_.isObject(item)) {
          return item[callback];
        }
      }
    }
    let result = {};
    for (let i = 0; i < list.length; i++) {
      const key = _callback(list[i], i, list);
      result[key] = list[i];
    }
    return result;
  },

  countBy: function (list, callback, context) {
    let _callback = context ? callback.bind(context) : callback;
    if (!(_.isArray(list))) {
      return {};
    } else if (_.isString(_callback)) {
      _callback = (item) => {
        if (_.isObject(item)) {
          return item[callback];
        }
      }
    }
    let result = {};
    for (let i = 0; i < list.length; i++) {
      const key = _callback(list[i], i, list);
      if (result[key]) {
        result[key] += 1;
      } else {
        result[key] = 1;
      }
    }
    return result;
  },

  shuffle: function (list) {
    const result = _.isArray(list) ? [...list] : _.values(list);
    for (let i = 0; i < result.length; i++) {
      const index = Math.floor(Math.random() * result.length);
      [result[i], result[index]] = [result[index], result[i]];
    }
    return result;
  },

  sample: function (list, n) {
    const random = (list) => Math.floor(Math.random() * list.length);
    if (n === undefined) return list[random(list)];
    let result = [];
    let keyList = [];
    const length = list.length > n ? n : list.length;
    for (let i = 0; i < length; i++) {
      let key = random(list);
      while (_.contains(keyList, key)) { // 若要独立，可用原生includes
        key = random(list);
      }
      keyList.push(key);
      result.push(list[key]);
    }
    return result;
  },

  toArray: function (list) {
    return [...list];
  },

  size: function (obj) {
    if (_.isObject(obj)) {
      return 0;
    } else if (_.isArray(obj)) {
      return obj.length;
    } else {
      return _.keys(obj).length;
    }
  },

  partition: function (list, callback) {
    const _callback = callback || (data => data);
    let result = [[]];
    for (value of list) {
      if (_callback(value)) {
        result[0].push(value);
      } else {
        result[1].push(value);
      }
    }
    return result;
  },
    
};

collections.forEach = collections.each;

export default collections;
