import axios from 'axios';
import { parse } from 'csv-parse/sync';

export async function readSheet(sheetUrl) {
  const response = await axios.get(sheetUrl);
  const data = parse(response.data, {
    columns: true,
    skip_empty_lines: true
  });
  console.log(data);
  return data;
}


// import axios from "axios";
// import fs from "fs";
// import path from "path";
// import { parse } from "csv-parse/sync";
// import { fileURLToPath } from "url";
// import crypto from "crypto";

// // needed for __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export async function readSheet(sheetUrl) {
//   // create a unique temp file name
//   const tempFileName = `sheet_${Date.now()}_${crypto.randomUUID()}.csv`;
//   const tempFilePath = path.join(__dirname, tempFileName);

//   try {
//     // 1️⃣ Download spreadsheet
//     const response = await axios.get(sheetUrl, {
//       responseType: "text",
//     });

//     // 2️⃣ Save locally
//     fs.writeFileSync(tempFilePath, response.data);

//     // 3️⃣ Read & parse
//     const fileContent = fs.readFileSync(tempFilePath, "utf8");

//     const data = parse(fileContent, {
//       columns: true,
//       skip_empty_lines: true,
//       trim: true,
//     });

//     return data;
//   } finally {
//     // 4️⃣ Always delete file (even if test fails)
//     if (fs.existsSync(tempFilePath)) {
//       fs.unlinkSync(tempFilePath);
//     }
//   }
// }
