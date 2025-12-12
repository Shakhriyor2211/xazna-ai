const content = {
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/stt-content/uz').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/stt-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/stt-content/ru').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/stt-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/stt-content/en').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/stt-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default)}})()
};
export default content;
