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

  rest: function(list, length = 1) {s
    if (!(list instanceof Array)) return undefined;
    let result = [];
    for (let i = length; i < list.length; i++) {
      result.push(list[i]);
    }
    return result;
  },

  flatten: function(list, isSingle) {

  }
};

export default array;
