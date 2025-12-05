const content = {
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/signin-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/signin-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/signin-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/signin-content.en.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/signin-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/signin-content.ru.json'))}})()
};
module.exports = content;
