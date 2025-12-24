const content = {
  'en': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/key-monitoring-content/en').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/key-monitoring-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'uz': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/key-monitoring-content/uz').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/key-monitoring-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)}})(),
  'ru': () => (async () => { try {return await fetch('http://localhost:4000/dictionaries/key-monitoring-content/ru').then(res => res.json())} catch (_error) {return await import('./../dynamic_dictionary/key-monitoring-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default)}})()
};
export default content;
