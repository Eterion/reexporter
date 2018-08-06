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
import { dirname, join, resolve } from 'path';
import { Callback, Module, Options } from 'types';
import hasProperty from 'utils/hasProperty';

export default async function(
  patterns?: string | string[],
  options?: Options
): Promise<Callback[]> {
  const opt = Object.assign({}, optionsDefaults, options);
  const files = glob.sync(
    patterns
      ? typeof patterns === 'string'
        ? patterns
        : `{${patterns.join(',')}}`
      : join(__dirname, '**/*'),
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
        if (module) {
          dirs[dirname(dir)] = dirs[dirname(dir)]
            .concat(module)
            .sort((a, b) => {
              if (a.isRecursion) return -1;
              if (b.isRecursion) return 1;
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            });
        }
      }
    });
  }
  const promises: Array<Promise<Callback>> = [];
  Object.keys(dirs).forEach(dir => {
    promises.push(
      new Promise((success, fail) => {
        const modules = dirs[dir];
        const contents = createContents(modules, opt);
        const file = `${opt.fileName}.${opt.fileExtension}`;
        const index = join(resolve(__dirname), dir, file);
        if (modules.length) {
          access(index, R_OK, err => {
            if (err) {
              if (err.code === 'ENOENT') {
                add(index, contents, opt)
                  .then(data => {
                    success({ ...data, contents, modules });
                  })
                  .catch(err => {
                    fail(err);
                  });
              } else {
                fail(err);
              }
            } else {
              update(index, contents, opt)
                .then(data => {
                  success({ ...data, contents, modules });
                })
                .catch(err => {
                  fail(err);
                });
            }
          });
        } else {
          remove(index, opt)
            .then(data => {
              success({ ...data, contents, modules });
            })
            .catch(err => {
              fail(err);
            });
        }
      })
    );
  });
  return Promise.all(promises);
}
