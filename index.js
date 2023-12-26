const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

exports.createNwriteToFileCall = createNwriteToFile;
exports.generateDirectoryCall = generateDirectory;
exports.changePathFromCurrentDirectoryCall = changePathFromCurrentDirectory;
exports.eraseFileCall = eraseFile;
exports.eraseDirectoryCall = eraseDirectory;
exports.relocateFileOrDirectoryCall = relocateFileOrDirectory;
exports.cloneFileCall = cloneFile;
exports.systemInformationCall = systemInformation;
exports.getRunningProcessesCall = getRunningProcesses;
exports.wipeScreenCall = wipeScreen;

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
  const sourcePath = process.argv[2];
  const destinationPath = path.join(process.argv[3], sourcePath);
  console.log(sourcePath);
  console.log(destinationPath);
  fs.rename(sourcePath, destinationPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// @desc:  cloning or copying a file
function cloneFile() {
  const sourcePath = process.argv[2];
  const destinationPath = path.join(process.argv[3], sourcePath);

  fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function systemInformation() {
  console.log("Platform: ", os.platform());
  console.log("Type: ", os.type());
  console.log("Release: ", os.release());
  console.log("Architecture: ", os.arch());
  console.log("CPUs: ", os.cpus());
  console.log("Total Memory: ", os.totalmem());
  console.log("Free Memory: ", os.freemem());
  console.log("User Info: ", os.userInfo());
}

function getRunningProcesses() {
  exec("tasklist", (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }

    const processes = stdout.split("\n").slice(2, 12);
    console.log(processes.join("\n"));
  });
}

// ------------------------------------------------------------------------------------------------------------

// @desc:  changing path
//                                         !!! NOT COMPLETED: CANNOT CHANGE THE PATH
function changePathFromCurrentDirectory() {
  const jottedDirName = process.argv[2];
  const currPath = path.join(process.cwd(), jottedDirName);
  console.log(currPath);
  console.log(jottedDirName);
  process.chdir(currPath);
}

// @desc:  wiping/cleaning the screen
function wipeScreen() {
  exec("cls", (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
  });
}

function promptChange() {
  exec("prompt shell-z ~ ", (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    }
  });
}

promptChange();
