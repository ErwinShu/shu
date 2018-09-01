const _ = require('./shu.js');

const array = {
  first: function (list, length = 1) {
    if (!(list instanceof Array)) {
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
    if (!(list instanceof Array)) return undefined;
    let result = [];
    for (let i = 0; i < list.length - length; i++) {
      result.push(list[i]);
    }
    return result;
  },

  last: function(list, length = 1) {
    if (!(list instanceof Array)) {
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
    if (!(list instanceof Array)) return undefined;
    let result = [];
    for (let i = length; i < list.length; i++) {
      result.push(list[i]);
    }
    return result;
  },

  flatten: function (list, isSingle) {
    if (!(list instanceof Array)) return [];
    let result = [];
    function inner(list, isSingle, result) {
      if (list instanceof Array) {
        for (let i = 0; i < list.length; i++){
          if (isSingle) {
            if (list[i] instanceof Array) {
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
    if (!(list instanceof Array)) return [];
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
      if (value instanceof Array) {
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
      if (!(value instanceof Array)) {
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
    if (!(list instanceof Array)) return [];
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
    if (!(list instanceof Array)) return [];
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
    if (!(list instanceof Array)) return [];
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
    if (!(list instanceof Array)) return {};
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
    
  },

  indexOf: function (list, value, hasSort) {
    if (!(list instanceof Array)) return -1;
    let result = -1;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === value) {
        return i;
      }
    }
    return result;
  },

  lastIndexOf: function (list, value, hasSort) {
    if (!(list instanceof Array)) return -1;
    let result = -1;
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i] === value) {
        return i;
      }
    }
    return result;
  },

  sortedIndex: function () {
    
  },

  findIndex: function () {
    
  },

  findLastIndex: function () {
    
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
