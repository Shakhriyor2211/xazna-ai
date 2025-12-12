const content = {
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/keys-content/en').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/keys-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/keys-content/ru').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/keys-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/keys-content/uz').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/keys-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)}})()
};
export default content;
