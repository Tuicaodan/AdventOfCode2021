window.addEventListener("load", function () {

  const regex = /(?<command>[a-z]+)\s(?<unit>\d+)/

  let horizontalPosition = 0;
  let verticalPosition = 0;
  let aim = 0;

  const executeCommand = (direction, unit) => {
    switch (direction){
      case 'up':
        aim -= unit;
        break;
      case 'down':
        aim += unit;
        break;
      case 'forward':
        horizontalPosition += unit;
        verticalPosition += unit * aim;
        break;
      }
  }

  input.forEach(command => {
    const regexResult = regex.exec(command);

    const commandDirection = regexResult.groups.command;
    const commandUnit = parseInt(regexResult.groups.unit);

    executeCommand(commandDirection, commandUnit)
  });

  const resultOutput = this.document.querySelector(".result");
  resultOutput.innerHTML = `horizontalPosition: ${horizontalPosition}; verticalPosition: ${verticalPosition}; Final result: ${horizontalPosition * verticalPosition}`;

});



