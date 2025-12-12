const content = {
  'en': () => import('./key-monitoring-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./key-monitoring-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./key-monitoring-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
