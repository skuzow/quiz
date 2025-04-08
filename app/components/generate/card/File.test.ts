import { describe, it, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';

import { GenerateCardFile } from '#components';

mockNuxtImport('useI18n', () => () => useNuxtApp().$i18n);

describe('GenerateCardFile', () => {
  const { t: $t } = useI18n();

  it('can mount the component', async () => {
    const component = await mountSuspended(GenerateCardFile);
    const componentHtml = component.html();

    expect(componentHtml).toContain('type="file"');
    expect(componentHtml).toContain($t('form.type'));
    expect(componentHtml).toContain($t('form.questions'));
    expect(componentHtml).toContain($t('form.options'));
    expect(componentHtml).toContain('role="switch"');
  });
});
