import React from 'react';
import { stardust } from '@nebula.js/stardust';

import { useTranslations } from '../hooks';

interface TestCompArgs {
  translator: stardust.Translator;
}

export const TestCompTwo = ({ translator }: TestCompArgs) => {
  const t = useTranslations({ translator });

  return (
    <div>
      Test #2
      <br />
      <h1>T: {t.get('NebulaTableUtils.Test2')}</h1>
    </div>
  );
};
