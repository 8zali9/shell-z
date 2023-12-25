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
