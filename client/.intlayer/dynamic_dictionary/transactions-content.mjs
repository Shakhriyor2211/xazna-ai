const content = {
  'en': () => import('./transactions-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./transactions-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./transactions-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
