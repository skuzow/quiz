import { describe, it, expect } from 'vitest';

import { txtParse } from '@/utils/txtParse';
import { FileType } from '@/constants/file.constant';

describe('txtParse', () => {
  it('can parse txt file', async () => {
    const fileContent = 'Example txt content';
    const file = new File([fileContent], 'example.txt', { type: FileType.TXT });

    const result = await txtParse(file);

    expect(result).toBe(fileContent);
  });

  it('can parse txt empty file', async () => {
    const fileContent = '';
    const file = new File([fileContent], 'empty.txt', { type: FileType.TXT });

    const result = await txtParse(file);

    expect(result).toBe(fileContent);
  });

  it('can parse txt UTF-8 characters file', async () => {
    const fileContent = '例, 例子, 예, مثال';
    const file = new File([fileContent], 'international.txt', {
      type: FileType.TXT
    });

    const result = await txtParse(file);

    expect(result).toBe(fileContent);
  });
});
