const content = {
  'en': () => import('./sign-up-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./sign-up-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./sign-up-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
