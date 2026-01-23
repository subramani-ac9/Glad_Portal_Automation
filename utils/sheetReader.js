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
