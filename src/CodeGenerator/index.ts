import { findFiles } from './FileFinder/FileFinder';
import { capitalizeFirstLetter } from './Utilities/NameHandlers';
import { writeFile } from './Compiler/WriteFile';

const fileName = 'src/test.ts';

let code = ``;

const files = findFiles('./', '.screen.ts');

files.forEach(file => {
  const line = `import { ${capitalizeFirstLetter(file.name)}Screen } from './${
    file.importPath
  }';\n`;
  code += line;
});

writeFile(fileName, code);
