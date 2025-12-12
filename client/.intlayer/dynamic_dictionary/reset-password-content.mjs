const content = {
  'en': () => import('./reset-password-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./reset-password-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./reset-password-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
