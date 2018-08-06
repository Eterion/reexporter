import getName from 'module/getName';
import { basename } from 'path';
import { Module, Options } from 'types';

/**
 * Returns computed file path for index file.
 * @param {object} options Options.
 */

function computeFilePath({
  fileExtension,
  fileExtensionInPath,
  fileName,
  fileNameInPath,
}: Options): string {
  return fileNameInPath || fileExtensionInPath
    ? `/${fileName}${fileExtensionInPath ? '.' + fileExtension : ''}`
    : '';
}

/**
 * Returns module resolved as directory.
 * @param {string} path Directory path.
 * @param {object[]} modules List of modules.
 * @param {object} options Options.
 */

export default function(
  path: string,
  modules: Module[],
  options: Options
): Module | null {
  if (!modules.length) return null;
  const fileName = basename(path, '.' + options.fileExtension);
  return {
    isRecursion: true,
    name: getName(fileName),
    path: `./${fileName}${computeFilePath(options)}`,
  };
}
