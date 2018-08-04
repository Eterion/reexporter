import { expect } from 'chai';
import interpolate from 'utils/interpolate';

describe('interpolate()', () => {
  describe('- data provided as array of strings', () => {
    const template = 'The #0 brown fox jumps over the #1 dog';

    it('returns string with replaced data values', () => {
      expect(interpolate(template, ['quick', 'lazy'])).to.eq(
        'The quick brown fox jumps over the lazy dog'
      );
    });

    it('returns string with replaced available data and leave rest as is', () => {
      expect(interpolate(template, ['quick'])).to.eq(
        'The quick brown fox jumps over the #1 dog'
      );
    });

    it('returns string with no replacements', () => {
      expect(interpolate(template)).to.eq(template);
    });
  });

  describe('- data provided as object', () => {
    const template = 'The #speed brown fox jumps over the #mood dog';

    it('returns string with replaced data values', () => {
      expect(interpolate(template, { speed: 'quick', mood: 'lazy' })).to.eq(
        'The quick brown fox jumps over the lazy dog'
      );
    });

    it('returns string with replaced available data and leave rest as is', () => {
      expect(interpolate(template, { speed: 'quick' })).to.eq(
        'The quick brown fox jumps over the #mood dog'
      );
    });

    it('returns string with no replacements', () => {
      expect(interpolate(template)).to.eq(template);
    });
  });
});
