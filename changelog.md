# Changelog

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
