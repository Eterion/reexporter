import { access, unlink } from 'fs';
import { Fs, Options } from 'types';

/**
 * Removes index file and returns promise with action information.
 * @param {string} path File path.
 * @param {object} options Options.
 */

export default function(path: string, { log, test }: Options): Promise<Fs> {
  return new Promise((resolve, reject) => {
    function doResolve() {
      const message = `Removed: "${path}"`;
      const isTest = test ? ' (test)' : '';
      if (log) console.log(`\x1b[31m> ${message}${isTest}\x1b[0m`);
      resolve({ action: 'remove', message });
    }
    access(path, err => {
      if (err) {
        if (err.code !== 'ENOENT') {
          reject(err);
        }
      } else {
        test
          ? doResolve()
          : unlink(path, err => {
              if (err) {
                console.error(`Error: Cannot remove: "${path}"`);
                reject(err);
              } else {
                doResolve();
              }
            });
      }
    });
  });
}
