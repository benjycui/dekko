'use strict';

const assert = require('assert');
const $ = require('..');

describe('dekko', () => {
  it('should throw error when there is no file that matches pattern', () => {
    assert.throws(() => $('inexisting'));
  });

  describe('#assert', () => {
    it('should not throw error when pred returns `true`', () => {
      assert.doesNotThrow(() => $('test/fixtures').assert('oops', () => true));
    });

    it('should throw error when pred returns `false`', () => {
      assert.throws(() => $('test/fixtures').assert('oops', () => false));
    });
  });

  describe('#isFile', () => {
    it('should not throw when it\'s a file', () => {
      assert.doesNotThrow(() => $('test/fixtures/a').isFile());
    });

    it('should throw when it isn\'t file', () => {
      assert.throws(() => $('test/fixtures/b').isFile());
    });

    it('should throw for part of it isn\'t file', () => {
      assert.throws(() => $('test/fixtures/*').isFile());
    });
  });

  describe('#isDirectory', () => {
    it('should not throw when it\'s a directory', () => {
      assert.doesNotThrow(() => $('test/fixtures/b').isDirectory());
    });

    it('should throw when it isn\'t directory', () => {
      assert.throws(() => $('test/fixtures/a').isDirectory());
    });

    it('should throw for part of it isn\'t directory', () => {
      assert.throws(() => $('test/fixtures/*').isDirectory());
    });
  });

  describe('#hasFile', () => {
    it('should not throw when it has such file', () => {
      assert.doesNotThrow(() => $('test/fixtures').hasFile('a'));
    });

    it('should throw when it has no such file', () => {
      assert.throws(() => $('test/fixtures').hasFile('c'));
    });

    it('should throw when this file isn\'t file', () => {
      assert.throws(() => $('test/fixtures').hasFile('b'));
    });
  });

  describe('#hasDirectory', () => {
    it('should not throw when it has such directory', () => {
      assert.doesNotThrow(() => $('test/fixtures').hasDirectory('b'));
    });

    it('should throw when it has no such directory', () => {
      assert.throws(() => $('test/fixtures').hasDirectory('c'));
    });

    it('should throw when this file isn\'t directory', () => {
      assert.throws(() => $('test/fixtures').hasDirectory('a'));
    });
  });

  describe('#filter', () => {
    it('should work like Array.prototype.filter', () => {
      const o = $('test/fixtures/*').filter(filename => /a$/.test(filename));
      assert.deepEqual(o.filenames, [ 'test/fixtures/a' ]);
    });
  });
});
