# dekko

[![](https://img.shields.io/travis/benjycui/dekko.svg?style=flat-square)](https://travis-ci.org/benjycui/dekko)
[![npm package](https://img.shields.io/npm/v/dekko.svg?style=flat-square)](https://www.npmjs.org/package/dekko)
[![NPM downloads](http://img.shields.io/npm/dm/dekko.svg?style=flat-square)](https://npmjs.org/package/dekko)
[![Dependency Status](https://david-dm.org/benjycui/dekko.svg?style=flat-square)](https://david-dm.org/benjycui/dekko)

Nowadays, front-end engineers need to build or compile their code before deploying or publishing. However, building/compiling  is not as stable as we thought. Many factors will affect the output, such as configuration and our own code and even some dependencies. Some outputed file will be empty and even missing, so we need to check them before deploying/publishing.

It's inconvenient to check those files manually, so here comes `dekko` which is a tool to test whether outputed files or directory structure is valid.

## Usage

```bash
npm i --save-dev dekko
```

```js
const $ = require('dekko');

$('dist')
  .isDirectory()
  .hasFile('lib.js')
  .hasFile('lib.min.js');
```

## API

### $(pattern[, options]): Object

`pattern` and `options` in parameters are the same as [`glob`](https://github.com/isaacs/node-glob)'s. If `pattern` doesn't match any files with the `options`, dekko will throw an error which will stop CI.

This function will return a `dekko` object with the following methods.

### .isFile(): Object

If every item in `dekko` object is a file, nothing will happen. Otherwise, `dekko` will throw an error.

### .isDirectory(): Object

If every item in `dekko` object is a directory, nothing will happen. Otherwise, `dekko` will throw an error.

### .hasFile(name: string): Object

If every item in `dekko` object has a sub-file with this `name`, nothing will happen. Otherwise, `dekko` will throw an error.

### .hasDirectory(name: string): Object

If every item in `dekko` object has a sub-directory with this `name`, nothing will happen. Otherwise, `dekko` will throw an error.

### .assert(message: string, pred: Function): Object

Sometimes, built-in utility functions are not enough. Then we can use `.assert`, if every item in `dekko` object pass the `pred` function, nothing will happen. Otherwise, `dekko` will throw an error with `message`.

#### pred(filename: string): boolean

`dekko` will pass filename to `pred` one by one. `true` means that file is valid, and `false` means invalid.

### .filter(cond): Object

`.filter` works like `Array.prototype.filter`, and it return a new `dekko` object with filtered items.

## License

MIT
