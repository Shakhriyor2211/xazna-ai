const content = {
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/navigation-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/navigation-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/navigation-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/navigation-content.en.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/navigation-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/navigation-content.ru.json'))}})()
};
module.exports = content;
