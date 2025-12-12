const content = {
  'en': () => Promise.resolve(require('./profile-content.en.json')),
  'ru': () => Promise.resolve(require('./profile-content.ru.json')),
  'uz': () => Promise.resolve(require('./profile-content.uz.json'))
};
module.exports = content;
