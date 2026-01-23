const content = {
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/verify-email-content/ru').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/verify-email-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/verify-email-content/en').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/verify-email-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/verify-email-content/uz').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/verify-email-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)}})()
};
export default content;
