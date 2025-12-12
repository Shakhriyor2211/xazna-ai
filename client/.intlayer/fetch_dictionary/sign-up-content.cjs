const content = {
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sign-up-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/sign-up-content.en.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sign-up-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/sign-up-content.uz.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sign-up-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/sign-up-content.ru.json'))}})()
};
module.exports = content;
