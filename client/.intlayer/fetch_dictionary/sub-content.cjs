const content = {
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sub-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/sub-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sub-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/sub-content.en.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sub-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/sub-content.ru.json'))}})()
};
module.exports = content;
