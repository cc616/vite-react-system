import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { formatResponse } from './response.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const toMockJson = (data, url) => {
  const outputToken = path.resolve(__dirname, `../../public/api${url}`);
  const dir = path.dirname(outputToken);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const formatted = formatResponse(data);
  fs.writeFileSync(outputToken, JSON.stringify(formatted, null, 2), 'utf-8');
};
