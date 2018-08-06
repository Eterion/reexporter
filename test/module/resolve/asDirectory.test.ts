import { expect } from 'chai';
import { options } from 'const';
import asDirectory from 'module/resolve/asDirectory';
import { Module } from 'types';

describe('asDirectory()', () => {
  it('resolves module as directory', () => {
    expect(
      asDirectory(
        'path/modules',
        [
          {
            name: 'modules',
            path: './modules',
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
    expect(asDirectory('path/modules', [], options)).to.deep.eq(null);
  });
});
