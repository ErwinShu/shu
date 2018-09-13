const _ = require('./shu.js');

const functions = {
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
  
};
  
export default functions;
  