export {
    writeTextInFile,
    concatenateFiles,
    copyFile,
    copyDirectory,
    deleteFile,
    namesInDirectory,
    createNecessaryDirectoriesSync,
};
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";


const createNecessaryDirectoriesSync = function (filePath) {
    const directoryname = path.dirname(filePath);
    if (fs.existsSync(directoryname)) {
        return;
    }
    fs.mkdirSync(directoryname, { recursive: true });
};

const writeTextInFile = function (filePath, string) {
    createNecessaryDirectoriesSync(filePath);
    return fsPromises.writeFile(filePath, string);
};


const concatenateFiles = function (files, destination, separator = ``) {
    return Promise.all(files.map(function (filePath) {
        return fsPromises.readFile(filePath, `utf-8`);
    })).then(function (contents) {
        return writeTextInFile(destination, contents.join(separator));
    });
};

const copyFile = function (filePath, filePathDestination) {
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(filePath)) {
            reject(`${filePath} does not exist`);
            return;
        }

        createNecessaryDirectoriesSync(filePathDestination);
        return fsPromises.copyFile(filePath, filePathDestination)
            .then(resolve)
            .catch(reject);
    });
};

const copyDirectory = function (directoryPath, directoryPathDestination) {
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(directoryPath)) {
            reject(`${directoryPath} does not exist`);
            return;
        }

        createNecessaryDirectoriesSync(directoryPathDestination);

        fs.readdir(directoryPath, { withFileTypes: true}, (error, dirents) => {
            if (error) {
                reject(error);
                return;
            }
            
            Promise.all(dirents.map(function (dirent) {
                const joinedSource = path.join(directoryPath, dirent.name);
                const joinedDestination = path.join(directoryPathDestination, dirent.name);
                if (dirent.isDirectory()) {
                    if (!fs.existsSync(joinedDestination)) {
                        fs.mkdirSync(joinedDestination, { recursive: true });
                    }
                    return copyDirectory(joinedSource, joinedDestination);
                }
                if (dirent.isFile()) {
                    return copyFile(joinedSource, joinedDestination);
                }
            })).then(() => {
                resolve();
            }).catch(reject);
        });
    });
};

const deleteFile = function (sourcePath) {
    return new Promise(function (resolve, reject) {
        fs.unlink(sourcePath, function (error) {
            if (error && error.code === `ENOENT`) {
                // file doens't exist
                resolve();
            } else if (error) {
                // other errors, e.g. maybe we don't have enough permission
                reject(`Error occurred while trying to remove file ${sourcePath}`);
            } else {
                resolve();
            }
        });
    });
};

const namesInDirectory = function (directoryPath) {
    return new Promise(function (resolve, reject) {
        fs.readdir(directoryPath, function (error, files) {
            if (error) {
                reject(error);
                return;
            }
            resolve(files);
        });
    });
};
