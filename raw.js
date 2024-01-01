function writeToFile() {
  const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  io.question("", (userInput) => {
    io.close();

    const jottedFileName = process.argv[2];

    fs.writeFile(`${process.cwd()}/${jottedFileName}`, userInput, (err) => {
      if (err) {
        console.log("error");
      } else {
        console.log("");
      }
    });
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
