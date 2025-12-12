const content = {
  'en': () => Promise.resolve(require('./user-monitoring-content.en.json')),
  'ru': () => Promise.resolve(require('./user-monitoring-content.ru.json')),
  'uz': () => Promise.resolve(require('./user-monitoring-content.uz.json'))
};
module.exports = content;
