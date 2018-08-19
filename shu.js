const collections = require('./collections');
const array = require('./array');

const shu = function() {}

shu.prototype = {
    ...collections,
    ...array,
};

export default shu;
