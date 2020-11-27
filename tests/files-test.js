import {
    textFileContent,
    writeTextInFile,
    concatenateFiles,
    copyFile,
    copyDirectory,
    deleteFile
} from "../files.js";


const initialString = `abc - éùô - xwz`;

const a = `a`;
const b = `b`;
const pathDeep = `${a}/${b}/c.txt`;

// writeTextInFile(pathDeep, initialString).then(function () {
//     textFileContent(pathDeep).then(async function (result) {
//         console.log(`success`, result === initialString);
//         console.log(result);

//         await deleteFile(pathDeep);
//     });
// });

copyDirectory(`tests`, `myCopy`)


// copyFile(`tests/files-test.js`, `copyFile/files-test.js`)
