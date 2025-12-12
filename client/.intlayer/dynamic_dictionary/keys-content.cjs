const content = {
  'en': () => Promise.resolve(require('./keys-content.en.json')),
  'ru': () => Promise.resolve(require('./keys-content.ru.json')),
  'uz': () => Promise.resolve(require('./keys-content.uz.json'))
};
module.exports = content;
