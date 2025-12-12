const content = {
  'en': () => import('./sub-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./sub-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./sub-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
