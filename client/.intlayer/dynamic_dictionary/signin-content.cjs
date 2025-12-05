const content = {
  'en': () => Promise.resolve(require('./signin-content.en.json')),
  'ru': () => Promise.resolve(require('./signin-content.ru.json')),
  'uz': () => Promise.resolve(require('./signin-content.uz.json'))
};
module.exports = content;
