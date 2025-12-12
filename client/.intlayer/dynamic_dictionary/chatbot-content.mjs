const content = {
  'en': () => import('./chatbot-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./chatbot-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./chatbot-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
