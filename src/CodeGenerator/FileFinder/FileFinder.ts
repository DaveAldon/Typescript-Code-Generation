import path from 'path';
import fs from 'fs';

interface FoundFile {
  path: string;
  fileName: string;
  name: string;
  importPath: string;
}

export const findFiles = (startPath: string, filter: string): FoundFile[] => {
  const result: FoundFile[] = [];
  const callback = (file: FoundFile) => {
    result.push(file);
  };
  recursiveFileSearch(startPath, filter, callback);
  return result;
};

export const recursiveFileSearch = (
  startPath: string,
  filter: string,
  callback: (file: FoundFile) => void
) => {
  const regexFromFilter = new RegExp(`.*\.(${filter})$`, 'ig');

  if (!fs.existsSync(startPath)) {
    console.log('Directory does not exist', startPath);
    return;
  }

  const files = fs.readdirSync(startPath);

  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    if (filename.indexOf('node_modules') > -1) continue;
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      recursiveFileSearch(filename, filter, callback);
    } else if (regexFromFilter.test(filename)) {
      const parsedFileName = filename.split('/').pop();
      const parsedName = parsedFileName?.split('.')[0];
      const parsedImportPath = parsedFileName?.substring(0, parsedFileName.lastIndexOf('.'));

      callback({
        path: filename,
        importPath: parsedImportPath || '',
        fileName: parsedFileName || '',
        name: parsedName || '',
      });
    }
  }
};
