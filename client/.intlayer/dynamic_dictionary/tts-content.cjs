const content = {
  'en': () => Promise.resolve(require('./tts-content.en.json')),
  'ru': () => Promise.resolve(require('./tts-content.ru.json')),
  'uz': () => Promise.resolve(require('./tts-content.uz.json'))
};
module.exports = content;
