import * as ts from 'typescript';
import { runDiagnostics } from '../Diagnostics/Diagnostics';
import { createProgram } from '../Program/Program';
import { createPrinter } from '../Printer/Printer';

export const compile = (fileName: string, code: string) => {
  const sourceFile = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest);
  const program = createProgram(fileName, sourceFile);
  const diagnosticResult = runDiagnostics(program);
  return diagnosticResult ? createPrinter(sourceFile) : '';
};
