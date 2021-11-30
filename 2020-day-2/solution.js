window.addEventListener("load", function () {
  let count = 0;

  const regex = /(?<lowBound>\d+)-(?<highBound>\d+)\s(?<targetWord>\w):\s(?<password>\w+)/;

  input.forEach((element) => {
    const regexResult = regex.exec(element);
    const lowBound = regexResult.groups.lowBound;
    const highBound = regexResult.groups.highBound;
    const targetWord = regexResult.groups.targetWord;
    const password = regexResult.groups.password;

    if (passPolicy(lowBound, highBound, targetWord, password)) {
      count++;
    }
  });

  const resultOutput = this.document.querySelector(".result");
  resultOutput.innerHTML = `${count}`;
});

const passPolicy = (lowBound, highBound, targetWord, password) => {
  let result = false;
  const NumTargetwordInPassword = password.split(targetWord).length - 1;
  if (
    NumTargetwordInPassword >= lowBound &&
    NumTargetwordInPassword <= highBound
  ) {
    result = true;
  }
  return result;
};
