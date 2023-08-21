import { stardust } from '@nebula.js/stardust';

import all from '../all.json';

export default function registerLocale(translator: stardust.Translator) {
  if (translator && translator.get && translator.add) {
    const t = 'NebulaTableUtils.MenuGroupLabel.Sorting';
    const g = translator.get(t);

    // TODO: no duplicate translations
    // if the translated string is different from its id,
    // the translations are assumed to already exist for the current locale
    if (g !== t) return;

    Object.keys(all).forEach((key): void => {
      console.log({ key });
      translator.add(all[key as keyof typeof all]);
    });
  }
}
