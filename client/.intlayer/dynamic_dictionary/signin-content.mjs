const content = {
  'en': () => import('./signin-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./signin-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./signin-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
