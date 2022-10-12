import { compile } from './Compiler';
import { writeFileSync } from 'fs';

export const writeFile = (path: string, content: string) => {
  const result = compile(path, content);
  writeFileSync(path, result, { encoding: 'utf-8' });
};
