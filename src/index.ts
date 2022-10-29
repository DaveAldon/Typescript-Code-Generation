#!/usr/bin/env node

import { GeneratePatternOptions, GenericCodePattern } from './codeGenerator';
import { generatePattern } from './codeGenerator/compiler/generatePattern';
import { parseMarkdown } from './codeGenerator/parsers/parseMarkdown';

parseMarkdown();

export { generatePattern, GenericCodePattern, GeneratePatternOptions, parseMarkdown };
