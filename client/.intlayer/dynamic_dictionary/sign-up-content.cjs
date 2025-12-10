const content = {
  'en': () => Promise.resolve(require('./sign-up-content.en.json')),
  'ru': () => Promise.resolve(require('./sign-up-content.ru.json')),
  'uz': () => Promise.resolve(require('./sign-up-content.uz.json'))
};
module.exports = content;
