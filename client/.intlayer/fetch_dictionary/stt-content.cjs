const content = {
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/stt-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/stt-content.ru.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/stt-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/stt-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/stt-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/stt-content.en.json'))}})()
};
module.exports = content;
