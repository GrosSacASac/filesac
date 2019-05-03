import {
    textFileContent,
    writeTextInFile,
    concatenateFiles,
    copyFile,
    deleteFile
} from "../files.js";

const initialString = `abc - éùô - xwz`;

const pathDeep = `a/b/c.txt`;

writeTextInFile(pathDeep, initialString).then(function () {
    textFileContent(pathDeep).then(function (result) {
        console.log(`success`, result === initialString);
        console.log(result);
    })
});
