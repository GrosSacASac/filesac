# filesac

file-functions for node.js that return Promises

## Note

Promise based file system functionality is now supported natively in node.js via `fs/promises`

However some function like copyFile from filesac do the right thing. Create subfolders if missing for example.

## Installation

[`npm i filesac`](https://www.npmjs.com/package/filesac)

## Import

```js
import {
    writeTextInFile,
    concatenateFiles,
    copyFile,
    copyDirectory,
    deleteFile,
    namesInDirectory,
    namesInDirectoryRecursive,
    createNecessaryDirectoriesSync,
    emptyDirectory,
} from "filesac";
```

## About

### Changelog

[Changelog](./changelog.md)

### License

[CC0](./license.txt)
