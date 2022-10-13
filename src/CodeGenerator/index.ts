import { generatePattern } from './compiler/generatePattern';

generatePattern({
  filePath: 'src/Example/test.ts',
  fileNamePattern: `.screen.ts`,
  codePatterns: [
    `import { $nameScreen } from './$importName';`,
    { pattern: `const $name = "thing";`, documentation: `Variable assignment` },
  ],
});
