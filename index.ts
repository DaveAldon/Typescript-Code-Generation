#!/usr/bin/env ts-node-script

import { generatePattern } from './src/CodeGenerator/compiler/generatePattern';
import { generatorExtensions } from './src/CodeGenerator/enums/generatorExtensions.enum';
import { paths } from './src/CodeGenerator/enums/paths.enum';
import { findFiles } from './src/CodeGenerator/fileFinder/fileFinder';
import { GeneratePatternOptions } from './index.d';
import { validateGeneratorJson } from './src/CodeGenerator/utilities/validateGeneratorJson';
const { resolve } = require('path');

findFiles(paths.root, generatorExtensions.json).forEach(({ path }) => {
  const generator = require(resolve(path)) as GeneratePatternOptions;
  if (validateGeneratorJson(generator, path)) generatePattern({ ...generator });
});
