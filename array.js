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

  difference: function () {
    
  },

  uniq: function () {
    
  },

  zip: function () {
    
  },

  object: function () {
    
  },

  indexOf: function () {
    
  },

  lastIndexOf: function () {
    
  },

  sortedIndex: function () {
    
  },

  range: function () {
    
  },
  
};

export default array;
