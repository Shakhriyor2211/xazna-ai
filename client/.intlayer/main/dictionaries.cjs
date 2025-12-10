const _QJVafm7BTRuA0uG4Usmi = require('../dictionary/chatbot-content.json');
const _LYBSQsOj72OZlqeEK0c8 = require('../dictionary/key-monitoring-content.json');
const _Rfl8JGz2q8vASNzT93Bv = require('../dictionary/keys-content.json');
const _mTAFtZkCT8iRJRxXeiN1 = require('../dictionary/main-content.json');
const _Nbi0difA3bOj8ZMwsf1D = require('../dictionary/navigation-content.json');
const _v8gE26cYh0WWFhtOxxjv = require('../dictionary/reset-password-content.json');
const _Yia9W5P18RVONZieXRwN = require('../dictionary/sign-in-content.json');
const _QfNmTcOyAXhiaHz446Gw = require('../dictionary/sign-up-content.json');
const _4YqbHyHIP1411q1Iq6wf = require('../dictionary/stt-content.json');
const _mugudsmhI1aPshO5zBPG = require('../dictionary/tts-content.json');
const _kYIUe3W0EhrwEOzUBtfD = require('../dictionary/user-monitoring-content.json');
const _dggUlSvEDkHzh5bjRVPP = require('../dictionary/verify-email-content.json');

const dictionaries = {
  "chatbot-content": _QJVafm7BTRuA0uG4Usmi,
  "key-monitoring-content": _LYBSQsOj72OZlqeEK0c8,
  "keys-content": _Rfl8JGz2q8vASNzT93Bv,
  "main-content": _mTAFtZkCT8iRJRxXeiN1,
  "navigation-content": _Nbi0difA3bOj8ZMwsf1D,
  "reset-password-content": _v8gE26cYh0WWFhtOxxjv,
  "sign-in-content": _Yia9W5P18RVONZieXRwN,
  "sign-up-content": _QfNmTcOyAXhiaHz446Gw,
  "stt-content": _4YqbHyHIP1411q1Iq6wf,
  "tts-content": _mugudsmhI1aPshO5zBPG,
  "user-monitoring-content": _kYIUe3W0EhrwEOzUBtfD,
  "verify-email-content": _dggUlSvEDkHzh5bjRVPP
};
const getDictionaries = () => dictionaries;

module.exports.getDictionaries = getDictionaries;
module.exports = dictionaries;
