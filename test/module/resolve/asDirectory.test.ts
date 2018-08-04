import { expect } from 'chai';
import { options } from 'const';
import asDirectory from 'module/resolve/asDirectory';
import { Module } from 'types';

describe('asDirectory()', () => {
  it('resolves module as directory', () => {
    expect(
      asDirectory(
        'modules',
        [
          {
            name: 'module',
            path: './module',
          },
        ],
        options
      )
    ).to.deep.eq({
      isRecursion: true,
      name: 'modules',
      path: './modules',
    } as Module);
  });

  it('resolves module as directory with no child modules', () => {
    expect(asDirectory('modules', [], options)).to.deep.eq(null);
  });
});
