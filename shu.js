const collections = require('./collections');

const shu = function() {}

shu.prototype = {
    ...collections,
};

export default shu;