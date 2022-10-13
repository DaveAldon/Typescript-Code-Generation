import * as ts from 'typescript';
import { runDiagnostics } from '../diagnostics/runDiagnostics';
import { createProgram } from '../program/createProgram';
import { createPrinter } from '../printer/createPrinter';

export const compile = (fileName: string, code: string) => {
  const sourceFile = ts.createSourceFile(fileName, code, ts.ScriptTarget.ESNext);
  const program = createProgram(fileName, sourceFile);
  const diagnosticResult = runDiagnostics(program);
  return diagnosticResult ? createPrinter(sourceFile) : '';
};
