# Changelog

## 14.2.0

add namesInDirectoryRecursive

## 14.1.0

deleteFile can delete directories too

add emptyDirectory function

## 14.0.0

Use npm 8, prefer to use node: imports

## 13.1.0

copyDirectory no longer resolves with Arrays filled with undefined

## 13.0.0

Remove

 * functions that have stable fs/promise equivalent

```js
import fsPromises from "node:fs/promises";

// old
textFileContent(x);
// new 
fsPromises.readFile(x, `utf-8`);
```

Requires 

 * Node 14+

## 12.1.0

expose

 * createNecessaryDirectoriesSync(filePath)

## 12.0.0

add

 * copyDirectory (recursive)

remove

 * copyFile does not resolve with a string like "tests/files-test.js was copied to copyFile/files-test.js"
 * copyFile resolves with undefined if successful
 * deleteFile does not resolve with `File ${sourcePath} doesn't exist, won't remove it.` or `removed`
 * deleteFile resolves with undefined if successful

## 11.1.0

add

 * namesInDirectory

## 11.0.0

Use ES module syntax.

## 10.0.0

Split utilsac into different projects https://github.com/GrosSacASac/utilsac/issues/4
