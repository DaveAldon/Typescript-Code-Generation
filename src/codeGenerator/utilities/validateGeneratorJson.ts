import { GeneratePatternOptions } from '..';

const errorMessage = 'property is missing in';

export const validateGeneratorJson = (generator: GeneratePatternOptions, fileName: string) => {
  if (!generator.codePatterns) {
    throw new Error(`codePatterns ${errorMessage} ${fileName}`);
  }
  if (!generator.fileNamePattern) {
    throw new Error(`fileNamePattern ${errorMessage} ${fileName}`);
  }
  if (!generator.filePath) {
    throw new Error(`filePath ${errorMessage} ${fileName}`);
  }
  return true;
};
