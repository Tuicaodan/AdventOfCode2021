window.addEventListener("load", function () {
  const matrixSize = 5;

  let newArray = convertNumberMatrixArrayToJsonMatrixArray(boardInput);

  let finalResult = -1;

  for (let i = 0; i <= drawnInput.length - 1; i++) {
    newArray = updatedArray(newArray, drawnInput[i]);

    let eachRoundResult = checkBingo(newArray, matrixSize);
      console.log("eachRoundResult: " + eachRoundResult);
      console.log("drawnNumber: " + drawnInput[i]);

      if (eachRoundResult != -1) {
        result = eachRoundResult * drawnInput[i];
        finalResult = result
        break;
      }
  }

  console.log(finalResult);

  // const resultOutput = this.document.querySelector(".result");
  // resultOutput.innerHTML = `Final result: ${finalResult}`;
});

const updatedArray = (inputArray, drawnNumber) => {
  let updateArray = inputArray.map((matrix) => {
    //console.log(matrix)
    let newMartix = matrix.map((object) => {
      if (object.number === drawnNumber) {
        //console.log("all true")
        const updatedJsonElement = {
          number: object.number,
          marked: true,
        };
        return updatedJsonElement;
      }
      return object;
    });
    return newMartix;
  });
  return updateArray;
};

const checkBingo = (inputArray, matrixSize) => {
  let result = -1;
  for (let i = 0; i <= inputArray.length - 1; i++) {
    let bingoresult = checkMartixBingo(inputArray[i], matrixSize);
    if (bingoresult != -1) {
      result = bingoresult;
      break;
    }
  }
  return result;
};

const checkMartixBingo = (inputMatrix, matrixSize) => {
  let result = -1;

  //check the row
  result = checkRowBingo(inputMatrix, matrixSize);
  if (result != -1) {
    return result;
  }
  //check the col
  result = checkColBingo(inputMatrix, matrixSize);
  if (result != -1) {
    return result;
  }
  return result;
};

const checkRowBingo = (inputMatrix, matrixSize) => {
  let result = -1;
  for (let i = 0; i <= inputMatrix.length - 1; i += matrixSize) {
    let rowArray = inputMatrix.slice(i, i + matrixSize);
    let markedCount = 0;
    let sum = 0;
    rowArray.forEach((jsonElement) => {
      if (jsonElement.marked == true) {
        markedCount++;
        sum += jsonElement.number;
      }
    });
    if (markedCount == matrixSize) {
      result = sum;
      break;
    }
  }
  return result;
};

const checkColBingo = (inputMatrix, matrixSize) => {
  let result = -1;
  for (let i = 0; i <= matrixSize - 1; i++) {
    let colArray = [];
    for (let j = 0; j <= inputMatrix.length - 1; j += matrixSize) {
      colArray.push(inputMatrix[j]);
    }
    let markedCount = 0;
    let sum = 0;
    colArray.forEach((jsonElement) => {
      if (jsonElement.marked == true) {
        markedCount++;
        sum += jsonElement.number;
      }
    });
    if (markedCount == matrixSize) {
      result = sum;
      break;
    }
  }
  return result;
};

const convertNumberMatrixArrayToJsonMatrixArray = (array) => {
  let newArray = [];
  array.forEach((numberMatrix) => {
    let newMatrix = convertNumberArrayToJsonArray(numberMatrix);
    newArray.push(newMatrix);
  });
  return newArray;
};

const convertNumberArrayToJsonArray = (numberArray) => {
  let newArray = [];
  numberArray.forEach((numberElement) => {
    const jsonElement = {
      number: numberElement,
      marked: false,
    };
    newArray.push(jsonElement);
  });
  return newArray;
};
