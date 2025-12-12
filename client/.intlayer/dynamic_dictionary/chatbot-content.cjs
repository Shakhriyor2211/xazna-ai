const content = {
  'en': () => Promise.resolve(require('./chatbot-content.en.json')),
  'ru': () => Promise.resolve(require('./chatbot-content.ru.json')),
  'uz': () => Promise.resolve(require('./chatbot-content.uz.json'))
};
module.exports = content;
