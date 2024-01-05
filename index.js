const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const batches = require("./batches.json");

module.exports.createNwriteToFileCall = createNwriteToFile;
module.exports.generateDirectoryCall = generateDirectory;
module.exports.eraseFileCall = eraseFile;
module.exports.eraseDirectoryCall = eraseDirectory;
module.exports.relocateFileOrDirectoryCall = relocateFileOrDirectory;
module.exports.cloneFileCall = cloneFile;
module.exports.systemInformationCall = systemInformation;
module.exports.getRunningProcessesCall = getRunningProcesses;
module.exports.runBatchesCall = runBatches;

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

// @desc:  fetching system information
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

// @desc:  fetching the first 10 running processes in the system
function getRunningProcesses() {
  exec("tasklist", (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }

    const processes = stdout.split("\n").slice(2, 12);
    console.log(processes.join("\n"));
  });
}

// @desc    helper async exec
function executeAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

// @desc:   simulation of batch processing
async function runBatches() {
  const jsonArray = Object.entries(batches);
  jsonArray.sort((a, b) => Object.keys(a[1]).length - Object.keys(b[1]).length);

  for (let batch = 0; batch < jsonArray.length; batch++) {
    const currentBatch = jsonArray[batch][1];
    const jobKeys = Object.keys(currentBatch); // array of key of the batch

    for (let i = 0; i < jobKeys.length; i++) {
      const jobKey = jobKeys[i]; // fecthes the key i.e. job
      const jobProcess = currentBatch[jobKey]; // fetches the value with that key/job

      try {
        await executeAsync(jobProcess);
      } catch (err) {
        console.error(err);
      }
    }

    console.log(`${jsonArray[batch][0]} executed`);
  }
}
