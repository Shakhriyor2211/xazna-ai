const content = {
  'en': () => Promise.resolve(require('./verify-email-content.en.json')),
  'ru': () => Promise.resolve(require('./verify-email-content.ru.json')),
  'uz': () => Promise.resolve(require('./verify-email-content.uz.json'))
};
module.exports = content;
