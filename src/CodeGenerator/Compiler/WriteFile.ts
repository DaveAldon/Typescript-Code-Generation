import { compile } from './compile';
import { writeFileSync } from 'fs';
import { formateHandler } from '../utilities/formatHandler';

export const writeFile = (path: string, content: string) => {
  const result = formateHandler(compile(path, content));
  writeFileSync(path, result, { encoding: 'utf-8' });
};
