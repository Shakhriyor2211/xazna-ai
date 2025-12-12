const content = {
  'en': () => Promise.resolve(require('./sub-content.en.json')),
  'ru': () => Promise.resolve(require('./sub-content.ru.json')),
  'uz': () => Promise.resolve(require('./sub-content.uz.json'))
};
module.exports = content;
