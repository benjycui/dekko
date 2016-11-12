'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function Dekko(pattern, options) {
  if (Array.isArray(pattern) && !options) {
    // Private
    this.filenames = pattern;
  } else {
    const filenames = glob.sync(pattern, options);
    if (filenames.length === 0) {
      throw new Error(`There is not file that matches pattern \`${pattern}\`.`);
    }
    this.filenames = filenames;
  }
}

Object.assign(Dekko.prototype, {
  assert(message, pred) {
    const failed = this.filenames.filter(filename => !pred(filename));
    failed.forEach(filename => {
      throw new Error(`'${filename}' ${message}`);
    });
    return this;
  },
  isFile() {
    return this.assert(
      'it should be a file',
      filename => fs.statSync(filename).isFile()
    );
  },
  isDirectory() {
    return this.assert(
      'it should be a directory',
      filename => fs.statSync(filename).isDirectory()
    );
  },
  hasFile(name) {
    return this.assert(`it should has a file named '${name}'`, filename => {
      return fs.readdirSync(filename).filter(subFilename => {
        return subFilename === name &&
          fs.statSync(path.join(filename, subFilename)).isFile();
      }).length === 1;
    });
  },
  hasDirectory(name) {
    return this.assert(`it should has a directory named '${name}'`, filename => {
      return fs.readdirSync(filename).filter(subDirName => {
        return subDirName === name &&
          fs.statSync(path.join(filename, subDirName)).isDirectory();
      }).length === 1;
    });
  },
  filter(cond) {
    const filenames = this.filenames.filter(cond);
    return new Dekko(filenames);
  },
});

module.exports = function dekkoFactory(pattern, options) {
  return new Dekko(pattern, options);
};
