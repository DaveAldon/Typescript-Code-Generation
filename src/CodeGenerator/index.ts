import { generatePattern } from './compiler/generatePattern';
import { generatorExtensions } from './enums/generatorExtensions.enum';
import { paths } from './enums/paths.enum';
import { findFiles } from './fileFinder/fileFinder';
import { GeneratePatternOptions } from './types/compiler';
import { validateGeneratorJson } from './utilities/validateGeneratorJson';
const { resolve } = require('path');

findFiles(paths.root, generatorExtensions.json).forEach(({ path }) => {
  const generator = require(resolve(path)) as GeneratePatternOptions;
  if (validateGeneratorJson(generator, path)) generatePattern({ ...generator });
});
