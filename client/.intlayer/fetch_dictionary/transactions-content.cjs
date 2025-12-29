const content = {
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/transactions-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/transactions-content.en.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/transactions-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/transactions-content.ru.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/transactions-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/transactions-content.uz.json'))}})()
};
module.exports = content;
