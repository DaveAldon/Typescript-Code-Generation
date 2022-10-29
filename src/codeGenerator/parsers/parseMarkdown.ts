import * as fs from 'fs';
import { GeneratePatternOptions, GenericCodePattern } from '..';
import { Tokens } from '../enums/characters.enum';
import { generatorExtensions } from '../enums/generatorExtensions.enum';
import { paths } from '../enums/paths.enum';
import { findFiles } from '../fileFinder/fileFinder';
import { generatePattern } from '../compiler/generatePattern';

export const parseMarkdown = () => {
  findFiles(paths.root, generatorExtensions.md).forEach(file => {
    const generator: GeneratePatternOptions = {
      filePath: '',
      fileNamePattern: '',
      codePatterns: [],
    };
    const markdownFile = fs.readFileSync(file.path, 'utf-8');
    const lines = markdownFile.split(/\r?\n/);
    const filePath = lines
      .slice(lines.indexOf(Tokens.FilePath) + 1, lines.indexOf(Tokens.FileNamePattern))
      .filter(Boolean);
    const fileNamePattern = lines
      .slice(lines.indexOf(Tokens.FileNamePattern) + 1, lines.indexOf(Tokens.CodePatterns))
      .filter(Boolean);
    const codePatternsBlock = lines.slice(lines.indexOf(Tokens.CodePatterns) + 1, lines.length);

    const codePatterns: GenericCodePattern[][] = [];

    while (codePatternsBlock.length > 0) {
      if (codePatternsBlock.indexOf(Tokens.Markdown) === -1) {
        break;
      }

      const codePattern = codePatternsBlock
        .splice(
          codePatternsBlock.indexOf(Tokens.MarkdownTS),
          codePatternsBlock.indexOf(Tokens.Markdown) + 1
        )
        .filter(e => e !== Tokens.MarkdownTS && e !== Tokens.Markdown);
      const codePatternObjects: GenericCodePattern[] = [];
      for (let i = 0; i < codePattern.length; i++) {
        codePatternObjects.push({
          pattern: codePattern[i],
          static: !codePattern[i].includes(Tokens.Pattern),
        });
      }
      codePatterns.push(codePatternObjects);
    }

    generator.filePath = filePath[0].replaceAll(Tokens.Snippet, '');
    generator.fileNamePattern = fileNamePattern[0].replaceAll(Tokens.Snippet, '');
    generator.codePatterns = codePatterns;
    generatePattern(generator);
  });
};
