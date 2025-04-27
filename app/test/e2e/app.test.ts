import { describe, expect, test } from 'vitest';
import { setup, createPage, url } from '@nuxt/test-utils/e2e';

describe('app', async () => {
  await setup();

  test('can mount the website', async () => {
    const page = await createPage();
    await page.goto(url('/'), { waitUntil: 'hydration' });

    const siteName = await page.textContent('span');
    expect(siteName).toBe('Quiz');
  });
});
