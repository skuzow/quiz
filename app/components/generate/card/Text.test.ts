import { describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';

import { GenerateCardText } from '#components';

mockNuxtImport('useI18n', () => () => useNuxtApp().$i18n);

describe('GenerateCardText', () => {
  const { t: $t } = useI18n();

  it('can mount the component', async () => {
    const component = await mountSuspended(GenerateCardText);
    const componentHtml = component.html();

    expect(componentHtml).toContain('<textarea');
    expect(componentHtml).toContain($t('form.type'));
    expect(componentHtml).toContain($t('form.questions'));
    expect(componentHtml).toContain($t('form.options'));
    expect(componentHtml).toContain('role="switch"');
  });
});
