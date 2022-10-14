import * as ts from 'typescript';
import { DiagnosticLog } from './../../../index.d';

/** Returns true if no errors, and false if an error is found.
 * Any errors found will be logged to the console.
 * @param program The program to run diagnostics on.
 */
export const runDiagnostics = (program: ts.Program): boolean => {
  const diagnostics = ts.getPreEmitDiagnostics(program);
  const diagnosticLogs: DiagnosticLog[] = [];
  let diagnosticResult = true;

  for (const diagnostic of diagnostics) {
    const message = diagnostic.messageText;
    const file = diagnostic.file;

    if (file) {
      const filename = file.fileName;
      const lineAndChar = file.getLineAndCharacterOfPosition(diagnostic.start as number);
      const line = lineAndChar.line + 1;
      const character = lineAndChar.character + 1;
      const lineText = file.text.split('\n')[line - 1];

      diagnosticLogs.push({
        reference: `${filename} (${line},${character})`,
        error: message.toString(),
        code: lineText,
      });
    }
  }

  if (diagnosticLogs.length > 0) {
    diagnosticResult = false;

    console.table(
      diagnosticLogs.map(diagnosticLog => {
        return {
          Reference: diagnosticLog.reference,
          Error: diagnosticLog.error,
          Description: diagnosticLog.code,
        };
      })
    );
  }
  return diagnosticResult;
};
