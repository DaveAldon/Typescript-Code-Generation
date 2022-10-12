import { writeFileSync } from 'fs';
import { compile } from './Compiler/Compiler';

const fileName = 'src/test.ts';
//const code = `const testNumber: number = 1 + 4;`;

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

const result = compile('src/index.ts', code);

writeFileSync(fileName, result, { encoding: 'utf-8' });
