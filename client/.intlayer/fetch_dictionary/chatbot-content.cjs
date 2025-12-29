const content = {
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/chatbot-content/ru').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/chatbot-content.ru.json'))}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/chatbot-content/uz').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/chatbot-content.uz.json'))}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/chatbot-content/en').then(res => res.json())} catch (_error) {return Promise.resolve(require('./../dynamic_dictionary/chatbot-content.en.json'))}})()
};
module.exports = content;
