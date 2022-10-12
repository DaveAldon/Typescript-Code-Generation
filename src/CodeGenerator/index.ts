import { generatePattern } from './compiler/generatePattern';

generatePattern({
  filePath: 'src/Example/test.ts',
  fileNamePattern: `.screen.ts`,
  pattern: `import { $nameScreen } from './$importName';\n`,
});
