export interface FoundFile {
  path: string;
  fileName: string;
  name: string;
  importName: string;
}
export interface CodePattern {
  pattern: string;
  documentation?: string;
  prePattern?: string;
  postPattern?: string;
}
export interface GeneratePatternOptions {
  filePath: string;
  fileNamePattern: string;
  codePatterns: GenericCodePattern;
  options?: {
    folder?: string;
  };
}
export interface GenericCodePattern {
  pattern: (string | CodePattern)[] | string | CodePattern;
}
export interface DiagnosticLog {
  reference: string;
  error: string;
  code: string;
}
