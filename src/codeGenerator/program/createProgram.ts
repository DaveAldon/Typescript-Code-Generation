import * as ts from 'typescript';

const defaultCompilerHost = ts.createCompilerHost({});

export const createProgram = (filename: string, sourceFile: ts.SourceFile) => {
  const customCompilerHost: ts.CompilerHost = {
    getSourceFile: (name, languageVersion) => {
      if (name === filename) {
        return sourceFile;
      } else {
        return defaultCompilerHost.getSourceFile(name, languageVersion);
      }
    },
    writeFile: (_filename, _data) => {},
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    useCaseSensitiveFileNames: () => false,
    getCanonicalFileName: filename => filename,
    getCurrentDirectory: () => '',
    getNewLine: () => '\n',
    getDirectories: () => [],
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
  };

  return ts.createProgram([filename], {}, customCompilerHost);
};
