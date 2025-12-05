const content = {
  'en': () => Promise.resolve(require('./signup-content.en.json')),
  'ru': () => Promise.resolve(require('./signup-content.ru.json')),
  'uz': () => Promise.resolve(require('./signup-content.uz.json'))
};
module.exports = content;
