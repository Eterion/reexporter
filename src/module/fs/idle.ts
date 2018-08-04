import { Fs, Options } from 'types';

/**
 * Returns promise with action information.
 * @param {string} path File path.
 * @param {object} options Options.
 */

export default function(path: string, { log }: Options): Fs {
  const message = `No changes: "${path}"`;
  if (log) console.log(message);
  return { action: 'idle', message };
}
