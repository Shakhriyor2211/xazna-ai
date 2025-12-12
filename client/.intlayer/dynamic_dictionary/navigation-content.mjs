const content = {
  'en': () => import('./navigation-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./navigation-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./navigation-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
