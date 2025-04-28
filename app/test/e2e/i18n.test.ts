import { describe, expect, test } from 'vitest';
import { setup, createPage, url } from '@nuxt/test-utils/e2e';

describe('i18n', async () => {
  await setup();

  test(
    'renders EN translation correctly in default route',
    { timeout: 10000 },
    async () => {
      const page = await createPage();
      await page.goto(url('/'));

      const description = await page.textContent('p');

      const { t: $t } = useNuxtApp().$i18n;

      expect(description).toBe($t('description'));
    }
  );

  test(
    'renders ES translation correctly in /es route',
    { timeout: 10000 },
    async () => {
      const page = await createPage();
      await page.goto(url('/es'));

      const description = await page.textContent('p');

      const { t: $t, setLocale } = useNuxtApp().$i18n;
      await setLocale('es');

      expect(description).toBe($t('description'));
    }
  );
});
