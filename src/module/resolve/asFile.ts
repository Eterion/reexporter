import getName from 'module/getName';
import { basename } from 'path';
import { Module, Options } from 'types';

/**
 * Returns true if module path should be ignored.
 * @param {string} file Module path.
 * @param {RegExp[]} regexp List of ignored regular expressions.
 * @param {object} options Options.
 */

function isIgnored(
  file: string,
  regexp: RegExp[],
  { moduleExtension }: Options
): boolean {
  return regexp
    .map(re => {
      const fileName = basename(file);
      return (
        !new RegExp(`\\.${moduleExtension}$`).test(fileName) ||
        re.test(fileName)
      );
    })
    .includes(true);
}

/**
 * Returns list of regular expressions that should be ignored.
 * @param {object} options Options.
 */

function ignoreList({
  fileExtension,
  fileName,
  ignore,
  moduleExtension,
}: Options): RegExp[] {
  return [
    new RegExp(`\\.(?:d|spec|test)\\.${moduleExtension}$`),
    new RegExp(`^${fileName}\\.${fileExtension}$`),
    ...(ignore
      ? ignore.map(name => {
          return new RegExp(
            typeof name === 'string' && /^\//.test(name) && /\/$/.test(name)
              ? name.substring(1, name.length - 1)
              : `^${name}\\.${moduleExtension}$`
          );
        })
      : []),
  ];
}

/**
 * Returns file extension based on options.
 * @param {object} options Options.
 */

function computeModuleExtension({
  moduleExtension,
  moduleExtensionInPath,
}: Options): string {
  return moduleExtensionInPath ? '.' + moduleExtension : '';
}

/**
 * Returns module resolved as file.
 * @param {string} file Module path.
 * @param {object} options Options.
 */

export default function(file: string, options: Options): Module | null {
  if (isIgnored(file, ignoreList(options), options)) return null;
  const fileName = basename(file, '.' + options.moduleExtension);
  return {
    name: getName(fileName),
    path: `./${fileName}${computeModuleExtension(options)}`,
  };
}
