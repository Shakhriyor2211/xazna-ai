const content = {
  'en': () => Promise.resolve(require('./sign-in-content.en.json')),
  'ru': () => Promise.resolve(require('./sign-in-content.ru.json')),
  'uz': () => Promise.resolve(require('./sign-in-content.uz.json'))
};
module.exports = content;
