const content = {
  'en': () => import('./signup-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./signup-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./signup-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
