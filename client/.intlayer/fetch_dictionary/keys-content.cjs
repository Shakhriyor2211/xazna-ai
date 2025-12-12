const content = {
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/keys-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/keys-content.en.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/keys-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/keys-content.ru.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/keys-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/keys-content.uz.json'))}})()
};
module.exports = content;
