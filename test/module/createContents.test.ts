import { expect } from 'chai';
import { eol, options } from 'const';
import createContents from 'module/createContents';

describe('createContents()', () => {
  it('returns content from module', () => {
    expect(
      createContents(
        [
          {
            name: 'moduleName',
            path: './module-name',
          },
        ],
        options
      )
    ).to.eq(
      `${["export { default as moduleName } from './module-name';"].join(
        eol
      )}${eol}`
    );
  });

  it('returns content from multiple modules', () => {
    expect(
      createContents(
        [
          {
            name: 'firstModule',
            path: './first-module',
          },
          {
            name: 'secondModule',
            path: './second-module',
          },
        ],
        options
      )
    ).to.eq(
      `${[
        "export { default as firstModule } from './first-module';",
        "export { default as secondModule } from './second-module';",
      ].join(eol)}${eol}`
    );
  });

  it('returns content from recursive module', () => {
    expect(
      createContents(
        [
          {
            isRecursion: true,
            name: 'moduleName',
            path: './module-name',
          },
        ],
        options
      )
    ).to.eq(
      `${[
        "import * as moduleName from './module-name';",
        'export { moduleName };',
      ].join(eol)}${eol}`
    );
  });

  it('returns content from multiple recursive modules', () => {
    expect(
      createContents(
        [
          {
            isRecursion: true,
            name: 'firstModule',
            path: './first-module',
          },
          {
            isRecursion: true,
            name: 'secondModule',
            path: './second-module',
          },
        ],
        options
      )
    ).to.eq(
      `${[
        "import * as firstModule from './first-module';",
        "import * as secondModule from './second-module';",
        'export { firstModule, secondModule };',
      ].join(eol)}${eol}`
    );
  });
});
