import { extractRawText } from 'mammoth';

export const docxParse = async (file: File): Promise<string> => {
  const arrayBuffer: ArrayBuffer = await file.arrayBuffer();

  const result = await extractRawText({ arrayBuffer });

  const text: string = result.value;

  return text.trim();
};
