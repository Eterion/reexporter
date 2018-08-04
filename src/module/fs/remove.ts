import { access, unlink } from 'fs';
import idle from 'module/fs/idle';
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
      if (log) console.log(`\x1b[31m> ${message}\x1b[0m`);
      resolve({ action: 'remove', message });
    }
    access(path, err => {
      if (err) {
        if (err.code === 'ENOENT') resolve(idle(path, { log }));
        reject(err);
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
