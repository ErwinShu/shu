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
  
  throttle: function() {

  },
  
  debounce: function() {

  },
  
  once: function() {

  },
  
  after: function() {

  },
  
  before: function() {

  },
  
  wrap: function() {

  },
  
  negate: function() {

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
  