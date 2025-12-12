const content = {
  'en': () => Promise.resolve(require('./navigation-content.en.json')),
  'ru': () => Promise.resolve(require('./navigation-content.ru.json')),
  'uz': () => Promise.resolve(require('./navigation-content.uz.json'))
};
module.exports = content;
