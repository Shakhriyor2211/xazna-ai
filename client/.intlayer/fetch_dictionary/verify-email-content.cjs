const content = {
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/verify-email-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/verify-email-content.en.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/verify-email-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/verify-email-content.uz.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/verify-email-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/verify-email-content.ru.json'))}})()
};
module.exports = content;
