const content = {
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/signup-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/signup-content.ru.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/signup-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/signup-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/signup-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/signup-content.en.json'))}})()
};
module.exports = content;
