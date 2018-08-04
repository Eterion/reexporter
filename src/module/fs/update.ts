import { createHash } from 'crypto';
import { readFile, writeFile } from 'fs';
import idle from 'module/fs/idle';
import { Fs, Options } from 'types';

/**
 * Returns hash of provided data string.
 * @param {string} data Source data string.
 */

function getHash(data: string): string {
  return createHash('md5')
    .update(data)
    .digest('hex');
}

/**
 * Returns true if no differences are found between provided data strings.
 * @param {string|string[]} data List of data strings to be compared.
 */

function isEqualData(...data: string[]): boolean {
  return !data
    .slice(1)
    .map(item => getHash(data[0]) === getHash(item))
    .includes(false);
}

/**
 * Updates index file and returns promise with action information.
 * @param {string} path File path.
 * @param {string} contents File contents.
 * @param {object} options Options.
 */

export default function(
  path: string,
  contents: string,
  { log, test }: Options
): Promise<Fs> {
  return new Promise((resolve, reject) => {
    function doResolve() {
      const message = `Updated: "${path}"`;
      if (log) console.log(`\x1b[33m> ${message}\x1b[0m`);
      resolve({ action: 'update', message });
    }
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error: Cannot read "${path}"`);
        reject(err);
      } else {
        if (isEqualData(contents, data)) {
          resolve(idle(path, { log }));
        } else {
          test
            ? doResolve()
            : writeFile(path, contents, err => {
                if (err) {
                  console.error(`Error: Cannow update "${path}"`);
                  reject(err);
                } else {
                  doResolve();
                }
              });
        }
      }
    });
  });
}
