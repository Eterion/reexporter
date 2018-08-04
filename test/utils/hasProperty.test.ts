import { expect } from 'chai';
import hasProperty from 'utils/hasProperty';
const object = { existing: { deep: { is: true } } };

describe('hasProperty()', () => {
  it('returns true when property exists', () => {
    expect(hasProperty(object, 'existing')).to.eq(true);
  });

  it('returns true when deep property exists', () => {
    expect(hasProperty(object, 'existing', 'deep')).to.eq(true);
  });

  it("returns false when property doesn't exists", () => {
    expect(hasProperty(object, 'non-existing')).to.eq(false);
  });

  it("returns false when deep property doesn't exists", () => {
    expect(hasProperty(object, 'existing', 'non-deep')).to.eq(false);
  });

  describe('- properties as string (with dots)', () => {
    it('returns true when deep property exists', () => {
      expect(hasProperty(object, 'existing.deep')).to.eq(true);
    });

    it("returns false when deep property doesn't exists", () => {
      expect(hasProperty(object, 'existing.non-deep')).to.eq(false);
    });
  });
});
