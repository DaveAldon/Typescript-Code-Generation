import { findFiles } from '../fileFinder/fileFinder';
import { writeFile } from './writeFile';

/** Searches for files that fit the pattern, and returns a code string based on the given code patter.
 * @param filePath The path and name of the generated file to be made, like 'src/Example/test.ts'.
 * @param fileNamePattern The pattern to search files for. Best if used as an extension, like '.screen.ts'.
 * @param pattern The pattern to apply to found files:
 * Example pattern: "import { $name } from '$importPath';"
 * ```
 * - '$name' gets the first section of the file name: "MyScreen"
 * - '$fileName' gets the entire file name: "MyScreen.screen.ts"
 * - '$importPath' gets the file path without the last extension: "src/screens/MyScreen.screen"
 * - '$path' gets the full path: "src/screens/MyScreen.screen.ts"
 * ```
 * @param options Options for the search
 * ```
 * - folder: The folder to search in. Defaults to './'
 * ```
 */
interface GeneratePatternOptions {
  //capitalizationOverride: "" | "PascalCase" | "camelCase" | "snake_case" | "kebab-case" | "UPPER_CASE" | "lower_case";
  filePath: string;
  fileNamePattern: string;
  pattern: string;
  options?: {
    folder?: string;
  };
}
export const generatePattern = ({
  filePath,
  fileNamePattern,
  pattern,
  options,
}: GeneratePatternOptions) => {
  const { folder = './' } = options || {};
  const files = findFiles(folder || './', fileNamePattern);
  let code = ``;
  files.forEach(file => {
    const formattedPattern = pattern
      .replaceAll('$name', file.name)
      .replaceAll('$importName', file.importName)
      .replaceAll('$path', file.path)
      .replaceAll('$fileName', file.fileName);
    const line = `${formattedPattern}`;
    code += line;
  });
  writeFile(filePath, code);
};
