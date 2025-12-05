const content = {
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/signin-content/uz').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/signin-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/signin-content/en').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/signin-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/signin-content/ru').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/signin-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)}})()
};
export default content;
