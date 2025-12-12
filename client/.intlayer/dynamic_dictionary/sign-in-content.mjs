const content = {
  'en': () => import('./sign-in-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./sign-in-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./sign-in-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
