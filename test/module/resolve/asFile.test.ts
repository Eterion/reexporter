import { expect } from 'chai';
import { options } from 'const';
import asFile from 'module/resolve/asFile';
import { Module } from 'types';

describe('asFile()', () => {
  it('resolves module as file', () => {
    expect(asFile('modules/module-name.js', options)).to.deep.eq({
      name: 'moduleName',
      path: './module-name',
    } as Module);
  });

  it('resolves module as file with index file name', () => {
    expect(asFile('modules/index.js', options)).to.eq(null);
  });
});
