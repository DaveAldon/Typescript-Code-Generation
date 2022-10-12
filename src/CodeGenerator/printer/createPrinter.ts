import ts from 'typescript';

export const createPrinter = (sourceFile: ts.SourceFile) => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printFile(sourceFile);
};
