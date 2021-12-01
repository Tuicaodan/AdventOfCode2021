window.addEventListener("load", function () {
  const partOneCount = depthComparison(input);

  const newSumedMeasurement = arrayConvertion(input);

  const partTwoCount = depthComparison(newSumedMeasurement);

  const resultOutput = this.document.querySelector(".result");
  resultOutput.innerHTML = `part1: ${partOneCount} and part2: ${partTwoCount}`;
});

const depthComparison = (measurementArray) => {
  let count = 0;
  for (let i = 1; i <= measurementArray.length - 1; i++) {
    if (measurementArray[i] > measurementArray[i - 1]) {
      count++;
    }
  }
  return count;
};

const arrayConvertion = (measurementArray) => {
  let newArray = [];
  for (let i = 2; i <= measurementArray.length - 1; i++) {
    const measurementSum =
      measurementArray[i] + measurementArray[i - 1] + measurementArray[i - 2];
    newArray.push(measurementSum);
  }
  return newArray;
};
