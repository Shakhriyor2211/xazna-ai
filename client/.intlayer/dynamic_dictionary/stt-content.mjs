const content = {
  'en': () => import('./stt-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./stt-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./stt-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
