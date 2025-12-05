const _O9CfcaP0oOUxYyEwZiGK = require('../unmerged_dictionary/main-content.json');
const _vvfmc4PIY5Q08GH4mNwY = require('../unmerged_dictionary/navigation-content.json');
const _ST0zBfZ2B7FkaPLRRJ8O = require('../unmerged_dictionary/signin-content.json');
const _usCzVzUMLickH7RaGMPa = require('../unmerged_dictionary/signup-content.json');

const dictionaries = {
  "main-content": _O9CfcaP0oOUxYyEwZiGK,
  "navigation-content": _vvfmc4PIY5Q08GH4mNwY,
  "signin-content": _ST0zBfZ2B7FkaPLRRJ8O,
  "signup-content": _usCzVzUMLickH7RaGMPa
};
const getUnmergedDictionaries = () => dictionaries;

module.exports.getUnmergedDictionaries = getUnmergedDictionaries;
module.exports = dictionaries;
