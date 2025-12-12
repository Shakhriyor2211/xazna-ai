const content = {
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/profile-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/profile-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/profile-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/profile-content.en.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/profile-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/profile-content.ru.json'))}})()
};
module.exports = content;
