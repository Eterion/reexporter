import { eol } from 'const';
import { Module, Options } from 'types';
import interpolate from 'utils/interpolate';

/**
 * Returns code content of index file.
 * @param {object[]} modules List of modules.
 * @param {object} options Options.
 */

export default function(
  modules: Module[],
  {
    moduleTemplate,
    recursionTemplate,
    pragma,
    recursionTemplateExport,
  }: Options
): string {
  let contents = modules.reduce((str, module) => {
    const useTemplate = module.isRecursion ? recursionTemplate : moduleTemplate;
    return useTemplate ? str + interpolate(useTemplate, module) + eol : '';
  }, pragma ? (pragma || []).map(str => interpolate(str, { eol }) + eol).join('') : '');
  const dirs = modules.filter(module => module.isRecursion);
  if (dirs.length) {
    if (recursionTemplateExport) {
      contents +=
        interpolate(recursionTemplateExport, {
          recursion: dirs.map(module => module.name).join(', '),
        }) + eol;
    }
  }
  return contents;
}
