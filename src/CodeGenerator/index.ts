import { writeFileSync } from 'fs';
import { compile } from './Compiler/Compiler';
import fs from 'fs';
import { findFiles } from './FileFinder/FileFinder';

const fileName = 'src/test.ts';

const code = `
const hello: string = 'hello';
const world: string = 'world';
console.log(hello,world)

if (hello === 'hello') {
  if (hello === 'hello') {
    const result = world;
    const result2 = result;
  }
    const result = world;
    const result2 = result;
  }
`;

const files = findFiles('./', '.screen.tsx');
console.log(files);

//const result = compile(fileName, code);

//writeFileSync(fileName, result, { encoding: 'utf-8' });
