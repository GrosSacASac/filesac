import {
    writeTextInFile,
    concatenateFiles,
    copyFile,
    copyDirectory,
    deleteFile,
    createNecessaryDirectoriesSync
} from "../files.js";
import fsPromises from "fs/promises";

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
// writeTextInFile(pathDeep, initialString)
createNecessaryDirectoriesSync(pathDeep);
fsPromises.writeFile(pathDeep, initialString+"uuuuu");
// textFileContent("tests/folder/text.txt",).then(async function (result) {
//     // console.log(`success`, result === initialString);
//     console.log(result);

//     // await deleteFile(pathDeep);
// });
// fsPromises.readFile("tests/folder/text.txt","utf-8").then(async function (result) {
//             // console.log(`success`, result === initialString);
//             console.log(result);
    
//             // await deleteFile(pathDeep);
//         });
// copyDirectory(`tests`, `myCopy`)
// copyFile("tests/folder/text.txt", "tests/xxx/copy.txt").then(console.log)

// copyFile(`tests/files-test.js`, `copyFile/files-test.js`)
