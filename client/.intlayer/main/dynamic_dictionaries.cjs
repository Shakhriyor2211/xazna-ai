const _QvUHvEQLyABQog52dGZ8 = require('../dynamic_dictionary/main-content.cjs');
const _CjK18tNFUgV7FchEko1c = require('../dynamic_dictionary/navigation-content.cjs');
const _I0oq1IavCSpjhhXiQlt7 = require('../dynamic_dictionary/signin-content.cjs');
const _olDhLKt9mj9k7f3FnBBj = require('../dynamic_dictionary/signup-content.cjs');

const dictionaries = {
  "main-content": _QvUHvEQLyABQog52dGZ8,
  "navigation-content": _CjK18tNFUgV7FchEko1c,
  "signin-content": _I0oq1IavCSpjhhXiQlt7,
  "signup-content": _olDhLKt9mj9k7f3FnBBj
};
const getDynamicDictionaries = () => dictionaries;

module.exports.getDynamicDictionaries = getDynamicDictionaries;
module.exports = dictionaries;
