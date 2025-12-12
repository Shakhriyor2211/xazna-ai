const content = {
  'en': () => import('./verify-email-content.en.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'ru': () => import('./verify-email-content.ru.json', { assert: { type: 'json' }}).then(mod => mod.default),
  'uz': () => import('./verify-email-content.uz.json', { assert: { type: 'json' }}).then(mod => mod.default)
};
export default content;
