const collections = require('./collections');
const array = require('./array');
const functions = require('./functions');
const objects = require('./objects');
const utility = require('./utility');
window.shu = shu;

const shu = function() {}

shu.prototype = {
    ...collections,
    ...array,
    ...functions,
    ...objects,
    ...utility,
};

export default shu;
