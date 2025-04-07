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
  it('can mount the component', async () => {
    const component = await mountSuspended(Create);
    const componentHtml = component.html();

    expect(componentHtml).toContain('Publish');
    expect(componentHtml).toContain('Title');
    expect(componentHtml).toContain('Description');
    expect(componentHtml).toContain('Categories');
    expect(componentHtml).toContain('Question');
    expect(componentHtml).toContain('Option');
  });
});
