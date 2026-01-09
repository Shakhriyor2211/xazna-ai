const content = {
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/key-monitoring-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/key-monitoring-content.ru.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/key-monitoring-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/key-monitoring-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/key-monitoring-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/key-monitoring-content.en.json'))}})()
};
module.exports = content;
