const content = {
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sign-in-content/ru').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/sign-in-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sign-in-content/uz').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/sign-in-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/sign-in-content/en').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/sign-in-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default)}})()
};
export default content;
