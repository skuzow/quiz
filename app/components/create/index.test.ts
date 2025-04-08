import { vi, describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';

import { Create } from '#components';

mockNuxtImport('useI18n', () => () => useNuxtApp().$i18n);

vi.mock('~/composables/useAuth', () => ({
  useAuth: () => ({
    authUser: { name: 'Example', username: 'example' },
    authUserURL: '/users/example'
  })
}));

describe('Create', () => {
  const { t: $t } = useI18n();

  it('can mount the component', async () => {
    const component = await mountSuspended(Create);
    const componentHtml = component.html();

    expect(componentHtml).toContain($t('form.published'));
    expect(componentHtml).toContain($t('form.title'));
    expect(componentHtml).toContain($t('form.description'));
    expect(componentHtml).toContain($t('form.categories'));
    expect(componentHtml).toContain($t('form.question'));
    expect(componentHtml).toContain($t('form.option'));
  });
});
