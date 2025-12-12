const content = {
  'en': () => import('./keys-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./keys-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./keys-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
