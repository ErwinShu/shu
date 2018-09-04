const _ = require('./shu.js');

const array = {
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
  
};

export default array;
