#!/usr/bin/env node

//#!/usr/bin/env ts-node-script

import { generatorExtensions } from './codeGenerator/enums/generatorExtensions.enum';
import { paths } from './codeGenerator/enums/paths.enum';
import { GeneratePatternOptions } from './codeGenerator';
import { validateGeneratorJson } from './codeGenerator/utilities/validateGeneratorJson';
import { generatePattern } from './codeGenerator/compiler/generatePattern';
import { findFiles } from './codeGenerator/fileFinder/fileFinder';
const { resolve } = require('path');

findFiles(paths.root, generatorExtensions.json).forEach(({ path }) => {
  const generator = require(resolve(path)) as GeneratePatternOptions;
  if (validateGeneratorJson(generator, path)) generatePattern({ ...generator });
});
