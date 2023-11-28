import type {
  TextItem,
  TextMarkedContent,
} from "pdfjs-dist/types/src/display/api";

function isTextItem(item: TextItem | TextMarkedContent): item is TextItem {
  return "str" in item;
}

function isNameItem(item: TextItem): boolean {
  return item.height === 26;
}

function isCompanyItem(item: TextItem): boolean {
  return item.height === 12;
}

function isJobTitleItem(item: TextItem): boolean {
  return item.height === 11.5;
}

function isSectionItem(item: TextItem): boolean {
  return item.height === 15.75;
}

export async function extractTextFromPdf(buffer: ArrayBuffer) {
  const { getDocument } = await import(/* webpackIgnore: true */ "pdfjs-dist");

  const document = await getDocument(buffer).promise;

  let text = "";
  let section = 0;

  for (let i = 1; i <= document.numPages; i++) {
    const page = await document.getPage(i);
    const { items } = await page.getTextContent();
    for (const item of items) {
      if (!isTextItem(item)) {
        continue;
      }
      if (isNameItem(item)) {
        text += `# ${item.str}`;
        continue;
      }
      if (isSectionItem(item)) {
        text += `\n\n## ${item.str}\n`;
        section += 1;
        continue;
      }
      if (isCompanyItem(item)) {
        if (section === 1) {
          text += `${item.str}`;
        } else {
          text += `\n\n${item.str}\n`;
        }
        continue;
      }
      if (isJobTitleItem(item)) {
        text += `- ${item.str}`;
      }
    }
  }

  return text;
}
