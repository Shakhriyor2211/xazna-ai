const content = {
  'en': () => import('./user-monitoring-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./user-monitoring-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./user-monitoring-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
