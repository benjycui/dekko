# dekko

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

`pattern` and `options` in parameters are the same as [`glob`](https://github.com/isaacs/node-glob)'s. If `pattern` doesn't match any files with the `options`, dekko will throw an error.

This function will return a dekko object with the following methods.

### .isFile(): Object

If every file in dekko object is a file, nothing will happen. Otherwise, dekko will throw an error.

### .isDirectory(): Object

If every file in dekko object is a directory, nothing will happen. Otherwise, dekko will throw an error.

### .hasFile(name: string): Object

If every file in dekko object has a file with this `name`, nothing will happen. Otherwise, dekko will throw an error.

### .hasDirectory(name: string): Object

If every file in dekko object has a directory with this `name`, nothing will happen. Otherwise, dekko will throw an error.

### .assert(message: string, pred: Function): Object

Sometimes, built-in utility functions are not enough. Then we can use `.assert`, if every file in dekko object pass the `pred` function, nothing will happen. Otherwise, dekko will throw an error with `message`.

#### pred(filename: string): boolean

dekko will pass filename to `pred` one by one. `true` means that file is valid, and `false` means invalid.

## License

MIT
