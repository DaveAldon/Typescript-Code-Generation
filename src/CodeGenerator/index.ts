import { findFiles } from './fileFinder/fileFinder';
const { exec } = require('child_process');

findFiles('./', '.generator.ts').map(({ path }) => {
  exec(`npx ts-node ${path}`, (err: string, _stdout: string, _stderr: string) => {
    if (err) {
      console.error(err);
      return;
    } else console.log(`Code generated successfully by: ${path}`);
  });
});
