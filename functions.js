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
  
  memoize: function() {

  },
  
  delay: function() {

  },
  
  defer: function() {

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
  
  compose: function() {

  },
  
};
  
export default functions;
  