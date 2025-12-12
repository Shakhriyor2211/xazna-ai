const content = {
  'en': () => import('./profile-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./profile-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./profile-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
