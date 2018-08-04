import { expect } from 'chai';
import getName from 'module/getName';
const moduleName = 'indexFile';

describe('getName()', () => {
  it('returns module name from file name', () => {
    expect(getName('indexFile')).to.eq(moduleName);
  });

  it('returns module name from kebab case file name', () => {
    expect(getName('index-file')).to.eq(moduleName);
  });

  it('returns module name from file name with special characters', () => {
    expect(getName('index.file')).to.eq(moduleName);
  });

  it('returns module name trimmed from start and end', () => {
    expect(getName('-indexFile-')).to.eq(moduleName);
  });
});
