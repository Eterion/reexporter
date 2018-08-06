import { writeFile } from 'fs';
import { Fs, Options } from 'types';

/**
 * Creates index file and returns promise with action information.
 * @param {string} path File path.
 * @param {string} content File contents.
 * @param {object} options Options.
 */

export default function(
  path: string,
  content: string,
  { log, test }: Options
): Promise<Fs> {
  return new Promise((resolve, reject) => {
    function doResolve() {
      const message = `Created: "${path}"`;
      const isTest = test ? ' (test)' : '';
      if (log) console.log(`\x1b[32m> ${message}${isTest}\x1b[0m`);
      resolve({ action: 'add', message });
    }
    test
      ? doResolve()
      : writeFile(path, content, err => {
          if (err) {
            console.error(`Error: Cannot write "${path}"`);
            reject(err);
          } else {
            doResolve();
          }
        });
  });
}
