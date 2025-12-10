const content = {
  'en': () => Promise.resolve(require('./stt-content.en.json')),
  'ru': () => Promise.resolve(require('./stt-content.ru.json')),
  'uz': () => Promise.resolve(require('./stt-content.uz.json'))
};
module.exports = content;
