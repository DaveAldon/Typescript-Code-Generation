export interface FoundFile {
  path: string;
  fileName: string;
  name: string;
  importName: string;
}
export interface CodePattern {
  pattern: string;
  documentation?: string;
}
export interface GeneratePatternOptions {
  filePath: string;
  fileNamePattern: string;
  codePatterns: (string | CodePattern)[] | string | CodePattern;
  options?: {
    folder?: string;
  };
}
