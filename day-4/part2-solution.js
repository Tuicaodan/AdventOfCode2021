window.addEventListener("load", function () {
  const digitsLength = 12;

  const finalO2RatingArray = getiO2RatingArray(input, digitsLength);
  const finalCO2RatingArray = getCO2RatingArray(input, digitsLength);

  const finalResult =
    parseInt(finalO2RatingArray[0], 2) * parseInt(finalCO2RatingArray[0], 2);

  const resultOutput = this.document.querySelector(".result");
  resultOutput.innerHTML = `Final result: ${finalResult}`;
});

const getiO2RatingArray = (inputArray, digitsLength) => {
  let newArray = copyArray(inputArray);
  for (let i = 0; i <= digitsLength - 1; i++) {
    let oxygenIndividualDigitArray = getIndividualDigitArray(newArray, i);
    let oxygenArrayMostCommonBit = getMostCommonBit(oxygenIndividualDigitArray);
    removeDisqualifiedElement(newArray, oxygenArrayMostCommonBit, i);

    if (newArray.length <= 1) {
      break;
    }
  }
  return newArray;
};

const getCO2RatingArray = (inputArray, digitsLength) => {
  let newArray = copyArray(inputArray);
  for (let i = 0; i <= digitsLength - 1; i++) {
    let co2IndividualDigitArray = getIndividualDigitArray(newArray, i);
    let co2ArrayMostCommonBit =
      getMostCommonBit(co2IndividualDigitArray) == "0" ? "1" : "0";
    removeDisqualifiedElement(newArray, co2ArrayMostCommonBit, i);

    if (newArray.length <= 1) {
      break;
    }
  }
  return newArray;
};

const copyArray = (inputArray) => {
  let newArray = [];
  inputArray.forEach((element) => {
    newArray.push(element);
  });
  return newArray;
};

const removeDisqualifiedElement = (inputArray, targetString, index) => {
  for (let i = 0; i <= inputArray.length - 1; i++) {
    if (inputArray[i].charAt(index) != targetString) {
      inputArray.splice(i, 1);
      i--;
    }
  }
};

const getIndividualDigitArray = (inputArray, index) => {
  let individualDigitArray = [];
  inputArray.forEach((element) => {
    individualDigitArray.push(element.charAt(index));
  });
  return individualDigitArray;
};

const getMostCommonBit = (inputArray) => {
  let result = "";
  let oneCount = 0;
  let zeroCount = 0;

  inputArray.forEach((number) => {
    if (parseInt(number) == 1) {
      oneCount++;
    } else {
      zeroCount++;
    }
  });

  if (oneCount == zeroCount) {
    result = "1";
  } else {
    result = oneCount > zeroCount ? "1" : "0";
  }

  return result;
};
