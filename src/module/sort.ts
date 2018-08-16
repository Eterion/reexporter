import { Module, Options } from 'types';

/**
 * Returns sorted modules.
 * @param {array} modules List of modules.
 * @param {object} options Options.
 */

export default function(modules: Module[], { sort }: Options): Module[] {
  return modules.sort((a, b) => {
    switch (sort) {
      case 'alpha-desc':
        if (a.isRecursion) return -1;
        if (b.isRecursion) return 1;
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        break;
      default:
        if (a.isRecursion) return -1;
        if (b.isRecursion) return 1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        break;
    }
    return 0;
  });
}
