import { expect } from 'chai';
import { options } from 'const';
import asFile from 'module/resolve/asFile';
import { Module } from 'types';

describe('asFile()', () => {
  it('resolves module resolved as file', () => {
    expect(asFile('modules/module-name.js', options)).to.deep.eq({
      name: 'moduleName',
      path: './module-name',
    } as Module);
  });
});
