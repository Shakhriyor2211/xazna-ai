const content = {
  'en': () => import('./main-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./main-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./main-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
