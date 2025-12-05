const _TG0v7jCFadvov3lCA84a = require('../fetch_dictionary/main-content.cjs');
const _1lQXG73TIr5d22bcNKhQ = require('../fetch_dictionary/navigation-content.cjs');
const _waACiJePGkXME3P2kTWp = require('../fetch_dictionary/signin-content.cjs');
const _Jm1y51WZdRQt13ZkADQS = require('../fetch_dictionary/signup-content.cjs');

const dictionaries = {
  "main-content": _TG0v7jCFadvov3lCA84a,
  "navigation-content": _1lQXG73TIr5d22bcNKhQ,
  "signin-content": _waACiJePGkXME3P2kTWp,
  "signup-content": _Jm1y51WZdRQt13ZkADQS
};
const getFetchDictionaries = () => dictionaries;

module.exports.getFetchDictionaries = getFetchDictionaries;
module.exports = dictionaries;
