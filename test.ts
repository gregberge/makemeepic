import * as pdf from "pdfjs-dist";
import * as fs from "fs/promises";

async function extractTextFromPdf(filepath: string) {
  const buffer = await fs.readFile(filepath);

  const document = await pdf.getDocument(new Uint8Array(buffer)).promise;

  let allText = "";
  for (let i = 1; i <= document.numPages; i++) {
    const page = await document.getPage(i);
    const text = await page.getTextContent();
    allText += text.items
      .map((item) => ("str" in item ? item.str : ""))
      .join("\n");
  }
}

// const buffer = await fs.readFile("/Users/gregberge/Downloads/Profile (11).pdf");

// const document = await pdf.getDocument(new Uint8Array(buffer)).promise;

// let allText = "";
// for (let i = 1; i <= document.numPages; i++) {
//   const page = await document.getPage(i);
//   const text = await page.getTextContent();
//   for (const item of text.items) {
//     if (item.height === 26) {
//       allText += `Name: ${item.str}\n\nExperiences:\n`;
//     } else if (item.height === 12) {
//       allText += `\n${item.str}\n`;
//     } else if (item.height === 11.5) {
//       allText += `- ${item.str}`;
//     }
//   }
// }

// console.log(allText);
