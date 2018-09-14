const collections = require('./collections');
const array = require('./array');
const functions = require('./functions');
const objects = require('./objects');
const utility = require('./utility');

(function () {
    const shu = function (obj) {
        if (obj instanceof shu) return obj;
        if (!(this instanceof shu)) return new shu(obj);
        this.wrapped = obj;
    }
    
    shu.previousUnderscore = window._;
    
    shu.prototype = {
        ...collections,
        ...array,
        ...functions,
        ...objects,
        ...utility,
    };
})()