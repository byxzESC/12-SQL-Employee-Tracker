// using promisify from util
const util = require('util');






const todoQuestions = util.promisify(Questions);

module.exports = { todoQuestions };
