import { describe, expect, test } from 'vitest';
import { setup, createPage, url } from '@nuxt/test-utils';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

mockNuxtImport('useI18n', () => () => useNuxtApp().$i18n);

describe('i18n', async () => {
  await setup();

  const { t: $t, setLocale } = useI18n();

  test('renders EN translation correctly in default route', async () => {
    const page = await createPage();
    await page.goto(url('/'));

    const description = await page.textContent('p');

    expect(description).toBe($t('description'));
  });

  test('renders ES translation correctly in /es route', async () => {
    setLocale('es');

    const page = await createPage();
    await page.goto(url('/es'));

    const description = await page.textContent('p');

    expect(description).toBe($t('description'));
  });
});
