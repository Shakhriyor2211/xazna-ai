const _mTAFtZkCT8iRJRxXeiN1 = require('../dictionary/main-content.json');
const _Nbi0difA3bOj8ZMwsf1D = require('../dictionary/navigation-content.json');
const _Qb4VyHPc6THQESxK9BIg = require('../dictionary/signin-content.json');
const _Mb4Qr7M6vdarM7uRg3Ei = require('../dictionary/signup-content.json');

const dictionaries = {
  "main-content": _mTAFtZkCT8iRJRxXeiN1,
  "navigation-content": _Nbi0difA3bOj8ZMwsf1D,
  "signin-content": _Qb4VyHPc6THQESxK9BIg,
  "signup-content": _Mb4Qr7M6vdarM7uRg3Ei
};
const getDictionaries = () => dictionaries;

module.exports.getDictionaries = getDictionaries;
module.exports = dictionaries;
