import axios from 'axios';
import { parse } from 'csv-parse/sync';

export async function readSheet(sheetUrl) {
  const response = await axios.get(sheetUrl);
  return parse(response.data, {
    columns: true,
    skip_empty_lines: true
  });
}
