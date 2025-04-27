import { describe, expect, test } from 'vitest';
import { setup, createPage } from '@nuxt/test-utils';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

mockNuxtImport('useI18n', () => () => useNuxtApp().$i18n);

describe('i18n', async () => {
  await setup();

  test('renders EN translation correctly in default route', async () => {
    const page = await createPage('/');

    const description = await page.textContent('p');

    const { t: $t } = useI18n();

    expect(description).toBe($t('description'));
  }, 10000);

  test('renders ES translation correctly in /es route', async () => {
    const page = await createPage('/es');

    const description = await page.textContent('p');

    const { t: $t, setLocale } = useI18n();
    await setLocale('es');

    expect(description).toBe($t('description'));
  }, 10000);
});
