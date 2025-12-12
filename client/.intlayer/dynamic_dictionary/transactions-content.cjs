const content = {
  'en': () => Promise.resolve(require('./transactions-content.en.json')),
  'ru': () => Promise.resolve(require('./transactions-content.ru.json')),
  'uz': () => Promise.resolve(require('./transactions-content.uz.json'))
};
module.exports = content;
