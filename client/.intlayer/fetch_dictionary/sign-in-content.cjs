const content = {
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sign-in-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/sign-in-content.ru.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sign-in-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/sign-in-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sign-in-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/sign-in-content.en.json'))}})()
};
module.exports = content;
