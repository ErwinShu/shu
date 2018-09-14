const _ = require('./shu.js');

const chaining = {
  chain: function (obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  },

  value: function () {
    return this.wrapped;
  },
  
};

export default chaining;