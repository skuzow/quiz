import {
  GlobalWorkerOptions,
  getDocument,
  type PDFDocumentProxy,
  type PDFPageProxy
} from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export const pdfParse = async (file: File): Promise<string> => {
  const arrayBuffer: ArrayBuffer = await file.arrayBuffer();

  const pdfDocument: PDFDocumentProxy = await getDocument({
    data: arrayBuffer
  }).promise;

  let text: string = '';

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page: PDFPageProxy = await pdfDocument.getPage(pageNum);

    const pageText: string = await extractTextFromPage(page);

    text += pageText;
  }

  return text.trim();
};

const extractTextFromPage = async (page: PDFPageProxy): Promise<string> => {
  const textContent = await page.getTextContent();

  const pageText: string = textContent.items
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((item: any) => item.str)
    .toString();

  return pageText;
};
