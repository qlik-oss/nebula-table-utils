import { stardust, useTranslator } from '@nebula.js/stardust';
import registerLocale from '../../locale/src';

interface UseTranslationsArgs {
  translator: stardust.Translator;
}

const useTranslations = ({ translator }: UseTranslationsArgs): stardust.Translator => {
  // this should registers all.json file into translator objest and returns it!

  registerLocale(translator);

  return translator;
};

export default useTranslations;
