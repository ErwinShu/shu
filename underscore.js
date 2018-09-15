(function () {
  const _ = function (obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this.wrapped = obj;
  };
  
  _.previousUnderscore = window._;

  _.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g,
  };
  
  _.prototype = {
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
      return Array.from(list);
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

    first: function (list, length = 1) {
      if (!(_.isArray(list))) {
        return undefined;
      } else if (length === 1) {
        return list[0];
      }
      let result = [];
      for (let i = 0; i < length; i++) {
        result.push(list[i]);
      }
      return result;
    },
  
    initial: function(list, length = 1) {
      if (!(_.isArray(list))) return undefined;
      let result = [];
      for (let i = 0; i < list.length - length; i++) {
        result.push(list[i]);
      }
      return result;
    },
  
    last: function(list, length = 1) {
      if (!(_.isArray(list))) {
        return undefined;
      } else if (length === 1) {
        return list[0];
      }
      let result = [];
      for (let i = list.length - length; i < list.length; i++) {
        result.push(list[i]);
      }
      return result;
    },
  
    rest: function(list, length = 1) {
      if (!(_.isArray(list))) return undefined;
      let result = [];
      for (let i = length; i < list.length; i++) {
        result.push(list[i]);
      }
      return result;
    },

    compact: function (list) {
      let result = [];
      for (item of list) {
        if (item) {
          result.push(item);
        }
      }
      return result;
    },
  
    flatten: function (list, isSingle) {
      if (!(_.isArray(list))) return [];
      let result = [];
      function inner(list, isSingle, result) {
        if (_.isArray(list)) {
          for (let i = 0; i < list.length; i++){
            if (isSingle) {
              if (_.isArray(list[i])) {
                result.push(...list[i]);
              } else {
                result.push(list[i]);
              }
            } else {
              const item = inner(list[i], isSingle, result);
              item && result.push(item);
            }
          }
        } else if(!!list) {
          return list;
        }
      }
      inner(list,isSingle,result);
      return result;
    },
  
    without: function (list, ...rest) {
      if (!(_.isArray(list))) return [];
      let result = [];
      for (item of list) {
        for (value of rest) {
          if (item !== value) {
            result.push(item);
          }
        }
      }
      return result;
    },
  
    union: function (...rest) {
      let result = [];
      let list = [];
      let jumpList = [];
      for (value of rest) {
        if (_.isArray(value)) {
          list.push(...value);
        }
      }
      for (let i = 0; i < list.length; i++) {
        if (_.contains(jumpList, i)) continue; // 若要独立，可用原生includes
        for (let j = i + 1; j < list.length; j++) {
          if (list[i] === list[j]) {
            jumpList.push(j);
          }
        }
        result.push(list[i]);
      }
      return result;    
    },
  
    intersection: function (...rest) {
      if (!rest[0]) {
        return [];
      } else if (!rest[1]) {
        return rest[0];
      }
      for (value of rest) {
        if (!(_.isArray(value))) {
          return [];
        }
      }
      let result = [];
      for (let i = 0; i < rest[0].length; i++) {
        for (let j = 1; j < rest.length; j++) {
          if (!_.contains(rest[j], rest[0][i])) { // 独立使用可以用原生includes
            break;
          } else if (j === (rest.length - 1) && _.contains(rest[j], rest[0][i])) { // includes
            result.push(rest[0][i]);
          }
        }
      }
      return result; 
    },
  
    difference: function (list, ...rest) {
      if (!(_.isArray(list))) return [];
      let jumpList = [];
      let result = [];
      for (value of rest) {
        jumpList.push(...value);
      }
      for (item of list) {
        if (!_.contains(jumpList, item)) {
          result.push(item);
        }
      }
      return result;
    },
  
    uniq: function (list, hasSort, callback) {
      if (!(_.isArray(list))) return [];
      const _callback = callback || (data => data);
      let result = [];
      let jumpList = [];
      for (let i = 0; i < list.length; i++) {
        if (_.contains(jumpList, i)) {
          continue;
        } else {
          if (hasSort) {
            _callback(list[i]) === _callback(list[i + 1]) && jumpList.push(i + 1);
            result.push(list[i])
          } else {
            for (let j = i + 1; j < list.length; j++) {
              _callback(list[i]) === _callback(list[j]) && jumpList.push(j);
            }
            result.push(list[i]);
          }
        }
      }
      return result;
    },
  
    zip: function (...res) {
      let result = [];
      let length = 0;
      for (list of res) {
        if (list.length > length) {
          length = list.length;
        }
      }
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < length; j++) {
          if (!!result[j]) {
            result[j].push(res[i][j]);
          } else {
            result.push([]);
            result[j].push(res[i][j]);
          }
        }
      }
      return result;
    },
  
    unzip: function (list) {
      if (!(_.isArray(list))) return [];
      let result = [];
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
          if (!!result[j]) {
            result[j].push(list[i][j]);
          } else {
            result.push([]);
            result[j].push(list[i][j]);
          }
        }
      }
      return result;
    },
  
    object: function (list, values) {
      if (!(_.isArray(list))) return {};
      let result = {};
      if (values) {
        for (let i = 0; i < list.length; i++) {
          result[list[i]] = values[i];
        }
      } else {
        for (item of list) {
          result[item[0]] = item[1];
        }
      }
      return result;
    },
  
    chunk: function (list, length) {
      if (!_.isArray(list) || !_.isNumber(length) || length < 1) return [];
      let result = [];
      let item = [];
      for (let i = 0; i < list.length; i++) {
        if (item.length < length) {
          item.push(list[i]);
        } else {
          item = [list[i]];
        }
        if (item.length >= length || i === list.length - 1) {
          result.push(item);
        }
      }
      return result;
    },
  
    indexOf: function (list, value, hasSort) {
      if (!(_.isArray(list))) return -1;
      let result = -1;
      if (hasSort) {
        function findIndex(list, value, start, end) { // 二分法查找
          const middle = Math.floor((start + end) / 2);
          if (list[middle] === value) {
            return middle;
          } else if (list[middle] > value) {
            return findIndex(list, value, start, middle - 1);
          } else if (list[middle] < value) {
            return findIndex(list, value, middle + 1, end);
          } else {
            return -1;
          }
        }
        return findIndex(list, value, 0, list.length - 1);
      } else {
        for (let i = 0; i < list.length; i++) {
          if (list[i] === value) {
            return i;
          }
        }
        return result;
      }
    },
  
    lastIndexOf: function (list, value, lastIndex) {
      if (!(_.isArray(list))) return -1;
      const _lastIndex = _.isNumber(lastIndex) ? lastIndex : 0;
      let result = -1;
      for (let i = list.length - 1 - _lastIndex; i >= 0; i--) {
        if (list[i] === value) {
          return i;
        }
      }
      return result;
    },
  
    sortedIndex: function (list, value, callback, context) {
      if (!(_.isArray(list))) return 0;
      const _callback = callback ?
        (_.isString(callback) ? item => item[callback] : callback)
        : item => item;
      const __callback = context ? _callback.bind(context) : _callback;
      for (let i = 0; i < list.length; i++) {
        if (__callback(value) < __callback(list[i])) {
          return i;
        }
      }
      return list.length;
    },
  
    findIndex: function (list, callback, context) {
      if (!(_.isArray(list)) || !(_.isFunction(callback))) return -1;
      const _callback = context ? callback.bind(context) : callback;
      for (let i = 0; i < list.length; i++) {
        if (_callback(list[i], i, list)) return i;
      }
      return -1;
    },
  
    findLastIndex: function (list, callback, context) {
      if (!(_.isArray(list)) || !(_.isFunction(callback))) return -1;
      const _callback = context ? callback.bind(context) : callback;
      for (let i = list.length - 1; i >= 0; i++) {
        if (_callback(list[i], i, list)) return i;
      }
      return -1;
    },
  
    range: function (start, stop, step) {
      const _stop = arguments.length === 1 ? start : stop;
      const _start = arguments.length === 1 ? 0 : start;
      const _step = step || 0;
      let result = [];
      let value = _start;
      while (_value <= _stop) {
        result.push(value);
        value += _step;
      }
      return result;
    },
  
    bind: function(func, context, ...argument) {
      return func.bind(context, ...argument);
    },
    
    bindAll: function(object, ...name) {
      for (item of name) {
        object[item] = object[item].bind(object);
      }
    },
    
    partial: function (func, ...argument) {
      let indexList = [];
      for (let i = 0; i < argument.length; i++) {
        if (argument[i] === _) indexList.push(i);
      }
      return (...arg) => {
        let i = 0;
        for (value of indexList) {
          argument[value] = arg[i];
          i++;
        }
        return func(...argument)
      }
    },
    
    memoize: function(func, keyFunc) {
      const result = (key, ...arg) => {
        const address = keyFunc ? keyFunc(key, ...arg) : key;
        if (!result.cache.hasOwnProperty(address)) {
          result.cache[address] = func(key, ...arg);
        }
        return func(key, ...arg);
      };
      result.cache = {};
      return result;
    },
    
    delay: function(func, time = 0, ...argument) {
      return setTimeout(() => func(...argument), time);
    },
    
    defer: function(func, ...argument) {
      return setTimeout(() => func(...argument), 0);
    },
    
    throttle: function(func, time, option) { // 不懂怎么限制前后端使用
      const result = (...arg) => {
        clearTimeout(result.loading);
        result.timer = setTimeout(() => {
          result.loading = false;
        }, time);
        if (!result.loading) {
          result.loading = true;
          return func(...arg);
        }
      }
      return result;
    },
    
    debounce: function(func, time, immediate) {
      const result = (...arg) => {
        clearTimeout(result.loading);
        result.timer = setTimeout(() => {
          result.loading = !immediate;
        }, time);
        if (immediate ? !result.loading : result.loading) {
          result.loading = immediate;
          return func(...arg);
        }
      }
      return result;
    },
    
    once: function(func) {
      const result = (...arg) => {
        if (!result.isUse) {
          result.isUse = true;
          return func(...arg);
        }
      }
      return result;
    },
    
    after: function(count, func) {
      const result = (...arg) => {
        if (result.count) {
          result.count += 1;
        } else {
          result.count = 1;
        }
        if (result.count === count) {
          return func(...arg);
        }
      };
      return result;
    },
    
    before: function(count, func) {
      const result = (...arg) => {
        if (result.count) {
          result.count += 1;
        } else {
          result.count = 1;
        }
        if (result.count < count) {
          result.end = func(...arg);
        }
        return result.end;
      };
      return result;
    },
    
    wrap: function(func, wrapper) {
      return (...arg) => {
        return wrapper(func, ...arg);
      };
    },
    
    negate: function(func) {
      return (...arg) => {
        return !func(...arg);
      };
    },
    
    compose: function(...func) {
      return function (...arg) {
        let result;
        for (let i = func.length - 1; i >= 0; i--) {
          if (result) {
            result = func[i](result);
          } else {
            result = func[i](...arg);
          }
        }
        return result;
      };
    },

    restArguments: function (func, startIndex = 0) {
      return (...res) => {
        let arg = [];
        let rest = [];
        for (let i = 0; i < res.length; i++) {
          if (i < startIndex) {
            arg.push(res[i]);
          } else {
            rest.push(res[i]);
          }
          if (i === res.length - 1 && rest[0]) {
            arg.push(rest);
          }
        }
        return func(...arg);
      };
    },
    
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
  
    tap: function(obj, func) {
      func(obj);
      return obj;
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

    noConflict: function () {
      window._ = this.prevousUnderscore;
      return this;
    },
    
    identity: function (value) {
      return value;
    },
    
    constant: function (value) {
      return () => {
        return value;
      }
    },
    
    noop: function () {
      return undefined;
    },
    
    times: function (number, callback, context) {
      const _callback = context ? callback.bind(context) : callback;
      let result = [];
      for (let i = 0; i < number; i++) {
        _callback(i);
        result.push(_callback(i));
      }
      return result;
    },
    
    random: function (min, max) {
      const range = max - min;
      const number = Math.round(range * Math.random());
      return min + number;
    },
  
    mixin: function (object) {
      _.prototype = {
        ..._.prototype,
        ...object,
      };
    },
    
    iteratee: function (value, context) {
      if (_.isObject(value)) {
        return _.matcher(value);
      } else if (_.isFunction(value)) {
        return value.bind(context);
      } else if (_.isNull(value)) {
        return value => value;
      } else {
        return _.property(value);
      }
    },
    
    uniqueId: function (key) {
      if (this.uniqueId.count) {
        this.uniqueId.count += 1;
      } else {
        this.uniqueId.count = 1;
      }
      return key ? key + this.uniqueId.count : this.uniqueId.count;
    },
    
    escape: function (string) {
      if (!string) return '';
      const keyList = [' ', '&', '<', '>', '\'', '\"'];
      const valueList = ['&nbsp;', '&amp;', '&lt;', '&gt;', '&quot;', '&qpos;'];
      const obj = _.object(keyList, valueList);
      const regexp = new RegExp(`${keyList.join('|')}`, 'g');
      const result = string.replace(regexp, value => obj[value]);
      return result;
    },
    
    unescape: function (string) {
      if (!string) return '';
      const valueList = [' ', '&', '<', '>', '\'', '\"'];
      const keyList = ['&nbsp;', '&amp;', '&lt;', '&gt;', '&quot;', '&qpos;'];
      const obj = _.object(keyList, valueList);
      const regexp = new RegExp(`${keyList.join('|')}`, 'g');
      const result = string.replace(regexp, value => obj[value]);
      return result;
    },
    
    result: function (object, property, defaultValue) {
      const result = object(property);
      if (_.isFunction(result)) {
        return result();
      } else if (_.isUndefined(result)) {
        return defaultValue;
      } else {
        return result;
      }
    },
    
    now: function () {
      return new Date().valueOf();
    },
    
    template: function (string, setting) { // 部分实现，不支持自定义
      return (obj) => {
        const templateSettings = _.pick(
          { ...setting, ...this.templateSettings },
          'evaluate',
          'interpolate',
          'escape',
        );
        const _templateSettings = _.mapObject(templateSettings, (item) => {
          const _item = item.toString();
          return _item.replace(/^\/|\/([gim]?)$/g, '');
        });
        const regexp = new RegExp(_.values(_templateSettings).join('|'), 'g');
        const result = string.replace(regexp, (value, key) => {
          if (value.match('<%=')) {
            return obj[key.trim()];
          } else if (value.match('<%-')) {
            const result = _.escape(obj[key.trim()]);
            return result;
          } else if (value.match('<%')) {
            const key = value.replace(/<%|%>/g, '');
            const result = obj[key.trim()];
            return result;
          }
        });
        return result;
      };
    },
    
    chain: function (obj) {
      var instance = _(obj);
      instance._chain = true;
      return instance;
    },
  
    value: function () {
      return this.wrapped;
    },  
  };
})()