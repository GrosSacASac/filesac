export {
    textFileContent,
    writeTextInFile,
    concatenateFiles,
    copyFile,
    copyDirectory,
    deleteFile,
    namesInDirectory,
};
import fs from "fs";
import path from "path";


const createNecessaryDirectories = function (filePath) {
    const directoryname = path.dirname(filePath);
    if (fs.existsSync(directoryname)) {
        return;
    }
    fs.mkdirSync(directoryname, { recursive: true });
};

const textFileContent = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, `utf-8`, function (error, data) {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        });
    });
};

const writeTextInFile = function (filePath, string) {
    return new Promise(function (resolve, reject) {
        createNecessaryDirectories(filePath);
        fs.writeFile(filePath, string, `utf-8`, function (error) {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};


const concatenateFiles = function (files, destination, separator = ``) {
    return Promise.all(files.map(textFileContent)).then(function (contents) {
        return writeTextInFile(destination, contents.join(separator));
    });
};

const copyFile = function (filePath, filePathDestination) {
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(filePath)) {
            reject(`${filePath} does not exist`);
            return;
        }

        createNecessaryDirectories(filePathDestination);
        fs.copyFile(filePath, filePathDestination, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};

const copyDirectory = function (directoryPath, directoryPathDestination) {
    return new Promise(function (resolve, reject) {
        if (!fs.existsSync(directoryPath)) {
            reject(`${directoryPath} does not exist`);
            return;
        }

        createNecessaryDirectories(directoryPathDestination);

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
