import React from 'react';
import { stardust } from '@nebula.js/stardust';

import { useTranslations } from '../hooks';

interface TestCompArgs {
  translator: stardust.Translator;
}

export const TestComp = ({ translator }: TestCompArgs) => {
  const t = useTranslations({ translator });

  return (
    <div>
      Test #1
      <br />
      <h1>T: {t.get('NebulaTableUtils.Test')}</h1>
    </div>
  );
};
