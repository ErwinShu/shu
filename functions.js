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
  
  partial: function() {

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
  