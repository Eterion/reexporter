import { options as optionsDefaults } from 'const';
import { R_OK } from 'constants';
import { access } from 'fs';
import * as glob from 'glob';
import createContents from 'module/createContents';
import add from 'module/fs/add';
import remove from 'module/fs/remove';
import update from 'module/fs/update';
import asDirectory from 'module/resolve/asDirectory';
import asFile from 'module/resolve/asFile';
import sort from 'module/sort';
import { dirname, join, resolve } from 'path';
import { Module, Options } from 'types';
import hasProperty from 'utils/hasProperty';

export default function(patterns?: string | string[], options?: Options): void {
  const opt = Object.assign({}, optionsDefaults, options);
  const files = glob.sync(
    patterns
      ? typeof patterns === 'string'
        ? patterns
        : patterns.length > 1
          ? `{${patterns.join(',')}}`
          : patterns[0]
      : '**/*',
    { ignore: '**/node_modules/**/*' }
  );
  const dirs: { [key: string]: Module[] } = files
    .filter(file => /\//.test(file))
    .map(file => dirname(file))
    .filter((dir, index, self) => index === self.indexOf(dir))
    .reduce(
      (obj, dir) =>
        Object.assign(obj, {
          [dir]: files
            .filter(file => new RegExp(`^${dir}\\/[^\\/]+\\..+$`).test(file))
            .map(file => asFile(file, opt))
            .filter(Boolean),
        }),
      {}
    );
  if (opt.recursion) {
    Object.keys(dirs).forEach(dir => {
      if (hasProperty(dirs, dirname(dir))) {
        const module = asDirectory(dir, dirs[dir], opt);
        if (module) dirs[dirname(dir)] = dirs[dirname(dir)].concat(module);
      }
    });
  }
  const data: Array<{
    contents: string;
    index: string;
    modules: Module[];
  }> = [];
  Object.keys(dirs).forEach(dir => {
    const modules = sort(dirs[dir], opt);
    const contents = createContents(modules, opt);
    const file = `${opt.fileName}.${opt.fileExtension}`;
    const index = join(resolve(process.cwd()), dir, file);
    data.push({ contents, index, modules });
  });
  data.forEach(({ contents, index, modules }) => {
    if (modules.length) {
      access(index, R_OK, err => {
        if (err) {
          if (err.code === 'ENOENT') {
            add(index, contents, opt);
          } else {
            console.error(err);
          }
        } else {
          update(index, contents, opt);
        }
      });
    } else {
      remove(index, opt);
    }
  });
}
