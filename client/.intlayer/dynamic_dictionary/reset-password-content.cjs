const content = {
  'en': () => Promise.resolve(require('./reset-password-content.en.json')),
  'ru': () => Promise.resolve(require('./reset-password-content.ru.json')),
  'uz': () => Promise.resolve(require('./reset-password-content.uz.json'))
};
module.exports = content;
