const content = {
  'en': () => Promise.resolve(require('./main-content.en.json')),
  'ru': () => Promise.resolve(require('./main-content.ru.json')),
  'uz': () => Promise.resolve(require('./main-content.uz.json'))
};
module.exports = content;
