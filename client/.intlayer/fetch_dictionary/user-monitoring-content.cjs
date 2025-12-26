const content = {
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/user-monitoring-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/user-monitoring-content.en.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/user-monitoring-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/user-monitoring-content.uz.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/user-monitoring-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/user-monitoring-content.ru.json'))}})()
};
module.exports = content;
