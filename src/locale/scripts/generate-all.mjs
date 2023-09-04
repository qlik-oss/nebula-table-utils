#! /usr/bin/env node
import { globbySync } from 'globby';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const LOCALES_DIR = path.resolve(dirname, '../locales');
const LOCALES_FILES = globbySync([`${LOCALES_DIR}/*.json`]);
const LOCALE_PKG_DIR = path.resolve(dirname, '..');
const ALL = path.resolve(`${LOCALE_PKG_DIR}`, 'all.json');

const LOCALES = {
  'en-US': 'en-US',
  en: 'en-US',
  de: 'de-DE',
  fr: 'fr-FR',
  it: 'it-IT',
  ja: 'ja-JP',
  ko: 'ko-KR',
  nl: 'nl-NL',
  pl: 'pl-PL',
  pt: 'pt-BR',
  ru: 'ru-RU',
  sv: 'sv-SE',
  tr: 'tr-TR',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  es: 'es-ES',
};

// Generate step
const merged = {};
LOCALES_FILES.forEach((file) => {
  const short = path.parse(file).name;
  const locale = LOCALES[short];
  const content = JSON.parse(fs.readFileSync(file, 'utf8'));

  Object.keys(content).reduce((acc, curr) => {
    const key = curr.replace(/\./g, '_');
    if (!acc[key]) {
      acc[key] = {
        id: curr,
      };
    }
    if (!acc[key].locale) {
      acc[key].locale = {};
    }
    acc[key].locale[locale] = content[curr].value;
    return acc;
  }, merged);
});

fs.writeFileSync(ALL, JSON.stringify(merged, ' ', 2));

// Verify Step
const languages = Object.values(LOCALES);
Object.keys(merged).forEach((key) => {
  const supportLanguagesForString = Object.keys(merged[key].locale);
  if (supportLanguagesForString.indexOf('en-US') === -1)
    // en-US must exist
    throw new Error(`String '${merged[key].id}' is missing value for 'en-US'`);

  for (let i = 0; i < languages.length; i++) {
    if (supportLanguagesForString.indexOf(languages[i]) === -1)
      // eslint-disable-next-line no-console
      console.warn(`String '${merged[key].id}' is missing value for '${languages[i]}'`);
  }
});
