const collections = require('./collections');
const array = require('./array');
const functions = require('./functions');
const objects = require('./objects');
const utility = require('./utility');

const shu = function() {}

shu.prototype = {
    ...collections,
    ...array,
    ...functions,
    ...objects,
    ...utility,
};

export default shu;
