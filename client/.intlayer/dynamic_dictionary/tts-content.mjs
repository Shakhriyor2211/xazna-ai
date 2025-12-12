const content = {
  'en': () => import('./tts-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./tts-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./tts-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
