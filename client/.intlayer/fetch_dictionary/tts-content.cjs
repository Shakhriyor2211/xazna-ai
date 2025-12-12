const content = {
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/tts-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/tts-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/tts-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/tts-content.en.json'))}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/tts-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/tts-content.ru.json'))}})()
};
module.exports = content;
