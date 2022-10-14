import { generatePattern } from '../CodeGenerator/compiler/generatePattern';

generatePattern({
  filePath: 'src/Example/test2.ts',
  fileNamePattern: `.screen.ts`,
  codePatterns: [
    `import { $nameScreen } from './$importName';`,
    { pattern: `const $name = "thing";`, documentation: `Variable assignment` },
  ],
});
