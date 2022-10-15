import { compile } from './compile';
import { writeFileSync } from 'fs';
import { formatHandler } from '../utilities/formatHandler';

export const writeFile = (path: string, content: string) => {
  const result = formatHandler(compile(path, content));
  writeFileSync(path, result, { encoding: 'utf-8' });
};
