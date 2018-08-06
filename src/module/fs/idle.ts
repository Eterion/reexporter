import { Fs, Options } from 'types';

/**
 * Returns promise with action information.
 * @param {string} path File path.
 * @param {object} options Options.
 */

export default function(path: string, { log, test }: Options): Fs {
  const message = `No changes: "${path}"`;
  const isTest = test ? ' (test)' : '';
  if (log) console.log(`\x1b[2m> ${message}${isTest}\x1b[0m`);
  return { action: 'idle', message };
}
