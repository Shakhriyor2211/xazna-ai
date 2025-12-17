const content = {
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/profile-content/en').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/profile-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/profile-content/uz').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/profile-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/profile-content/ru').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/profile-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)}})()
};
export default content;
