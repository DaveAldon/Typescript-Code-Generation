import * as ts from 'typescript';
import { writeFileSync } from 'fs';

interface DiagnosticLog {
  reference: string;
  error: string;
  code: string;
}

const filename = 'test.ts';
const code = `const test: number = 1 + 3;`;
const sourceFile = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest);

/* const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const result = printer.printFile(sourceFile);
writeFileSync(filename, result, { encoding: 'utf-8' }); */

const defaultCompilerHost = ts.createCompilerHost({});

const customCompilerHost: ts.CompilerHost = {
  getSourceFile: (name, languageVersion) => {
    //console.log(`getSourceFile ${name}`);

    if (name === filename) {
      return sourceFile;
    } else {
      return defaultCompilerHost.getSourceFile(name, languageVersion);
    }
  },
  writeFile: (filename, data) => {},
  getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
  useCaseSensitiveFileNames: () => false,
  getCanonicalFileName: filename => filename,
  getCurrentDirectory: () => '',
  getNewLine: () => '\n',
  getDirectories: () => [],
  fileExists: ts.sys.fileExists,
  readFile: ts.sys.readFile,
};

const program = ts.createProgram(['test.ts'], {}, customCompilerHost);
const diagnostics = ts.getPreEmitDiagnostics(program);
const diagnosticLogs: DiagnosticLog[] = [];

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
  console.table(
    diagnosticLogs.map(diagnosticLog => {
      return {
        Reference: diagnosticLog.reference,
        Error: diagnosticLog.error,
        Description: diagnosticLog.code,
      };
    })
  );
} else {
  const transformationResult = ts.transform(sourceFile, []);
  const transformedSourceFile = transformationResult.transformed[0];
  const printer = ts.createPrinter();

  const result = printer.printNode(ts.EmitHint.Unspecified, transformedSourceFile, sourceFile);
  writeFileSync(filename, result, { encoding: 'utf-8' });
}
