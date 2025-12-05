import _8R6iUPeN00rj3O2mm879 from '../fetch_dictionary/main-content.mjs' with { type: 'json' };
import _AM41E7gGjLn9gSrTXsCx from '../fetch_dictionary/navigation-content.mjs' with { type: 'json' };
import _ntDryjEyxcfeuVVCiCbz from '../fetch_dictionary/signin-content.mjs' with { type: 'json' };
import _mqOJQsgrDuFgXdcN9mMp from '../fetch_dictionary/signup-content.mjs' with { type: 'json' };

const dictionaries = {
  "main-content": _8R6iUPeN00rj3O2mm879,
  "navigation-content": _AM41E7gGjLn9gSrTXsCx,
  "signin-content": _ntDryjEyxcfeuVVCiCbz,
  "signup-content": _mqOJQsgrDuFgXdcN9mMp
};
const getFetchDictionaries = () => dictionaries;

export { getFetchDictionaries };
export default dictionaries;
