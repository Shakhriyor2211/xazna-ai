const content = {
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/main-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/main-content.en.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/main-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/main-content.ru.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/main-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/main-content.uz.json'))}})()
};
module.exports = content;
