const content = {
  'en': () => Promise.resolve(require('./key-monitoring-content.en.json')),
  'ru': () => Promise.resolve(require('./key-monitoring-content.ru.json')),
  'uz': () => Promise.resolve(require('./key-monitoring-content.uz.json'))
};
module.exports = content;
