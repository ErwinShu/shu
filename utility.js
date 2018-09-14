const _ = require('./shu.js');

const utility = {
  noConflict: function () {
    window._ = window.prevousUnderscore;
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
  
  template: function (string, ) {

  },
  
};

export default utility;
