const content = {
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/main-content/uz').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/main-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/main-content/ru').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/main-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/main-content/en').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/main-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default)}})()
};
export default content;
