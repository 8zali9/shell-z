const fs = require("fs");
const path = require("path");
const readline = require("readline");

exports.createNwriteToFileCall = createNwriteToFile;
exports.generateDirectoryCall = generateDirectory;
exports.changePathFromCurrentDirectoryCall = changePathFromCurrentDirectory;
exports.eraseFileCall = eraseFile;
exports.eraseDirectoryCall = eraseDirectory;
exports.relocateFileOrDirectoryCall = relocateFileOrDirectory;

// @desc:  creating or creating & writing to a file
function createNwriteToFile() {
  const jottedFileName = process.argv[2];
  const currPath = `${process.cwd()}/${jottedFileName}`;
  let inputContent = process.argv[3];

  if (!inputContent) {
    inputContent = "";
  }

  fs.writeFile(currPath, inputContent, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// @desc:  deleting or erasing a file
function eraseFile() {
  const toErase = process.argv[2];
  const currPath = `${process.cwd()}/${toErase}`;

  fs.unlink(currPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// @desc:  creating a folder/directory
function generateDirectory() {
  const jottedDirName = process.argv[2];
  const currPath = `${process.cwd()}/${jottedDirName}`;

  fs.mkdir(currPath, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// @desc:  deleting or erasing a directory
function eraseDirectory() {
  const toErase = process.argv[2];
  const currPath = `${process.cwd()}/${toErase}`;

  fs.rm(currPath, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// @desc:  moving a file/directory
function relocateFileOrDirectory() {
  const toMove = process.argv[2];
  const sourcePath = process.argv[2];
  const destinationPath = path.join(process.argv[3], toMove);
  fs.rename(sourcePath, destinationPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// @desc:  changing path
//                                         !!! NOT COMPLETED: CANNOT CHANGE THE PATH
function changePathFromCurrentDirectory() {
  const jottedDirName = process.argv[2];
  const currPath = path.join(process.cwd(), jottedDirName);
  process.chdir(currPath);
  console.log(currPath);
  console.log(jottedDirName);
}
