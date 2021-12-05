window.addEventListener("load", function () {
  const matrixSize = 5;

  let convertedArrays = convertNumberMatrixArrayToJsonMatrixArray(boardInput);

  let finalResult = -1;
  let winningBoard = [];

  for (const drawnNum of drawnInput) {
    convertedArrays = updatedArray(convertedArrays, drawnNum);
    checkBingo(convertedArrays, matrixSize, winningBoard, drawnNum);
  }

  const lastWinningBoard = winningBoard[winningBoard.length - 1];
  const boardScore = calculateBoardScroe(lastWinningBoard);
  const drawnNumber = lastWinningBoard[0].drawnNumber;
  finalResult = boardScore * drawnNumber;

  const resultOutput = this.document.querySelector(".result");
  resultOutput.innerHTML = `Final result: ${finalResult}`;
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

const checkBingo = (inputArrays, matrixSize, winningBoardMap, drawnNumber) => {
  for (const inputArray of inputArrays) {
    let bingoresult = checkMartixBingo(inputArray, matrixSize);
    //console.log(bingoresult)
    if (bingoresult != -1) {
      addWinningBoardToArray(winningBoardMap, inputArray, drawnNumber);
      const index = inputArrays.indexOf(inputArray);
      inputArrays.splice(index, 1);
    }
  }
};

const addWinningBoardToArray = (
  winningBoardMap,
  inputArrayMatrix,
  drawnNumber
) => {
  const winningMatrix = inputArrayMatrix.map((jsonElement) => {
    const updatedJsonElement = {
      number: jsonElement.number,
      marked: jsonElement.marked,
      drawnNumber: drawnNumber,
    };
    return updatedJsonElement;
  });
  winningBoardMap.push(winningMatrix);
};

const checkMartixBingo = (inputMatrix, matrixSize) => {
  let result = -1;

  //check the row
  result = checkRowBingo(inputMatrix, matrixSize);
  if (result != -1) {
    result = calculateBoardScroe(inputMatrix);
    return result;
  }
  //check the col
  result = checkColBingo(inputMatrix, matrixSize);
  if (result != -1) {
    result = calculateBoardScroe(inputMatrix);
    return result;
  }
  return result;
};

const calculateBoardScroe = (inputMatrix) => {
  let sum = 0;
  inputMatrix.forEach((jsonElement) => {
    if (jsonElement.marked == false) {
      sum += jsonElement.number;
    }
  });
  return sum;
};

const checkRowBingo = (inputMatrix, matrixSize) => {
  let result = -1;
  for (let i = 0; i <= inputMatrix.length - 1; i += matrixSize) {
    let rowArray = inputMatrix.slice(i, i + matrixSize);
    let markedCount = 0;
    let sum = 0;
    for (const jsonElement of rowArray) {
      if (jsonElement.marked === true) {
        markedCount++;
        sum += jsonElement.number;
      }
    }
    if (markedCount === matrixSize) {
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
    for (let j = i; j <= inputMatrix.length - 1; j += matrixSize) {
      colArray.push(inputMatrix[j]);
    }
    let markedCount = 0;
    let sum = 0;
    for (const jsonElement of colArray) {
      if (jsonElement.marked === true) {
        markedCount++;
        sum += jsonElement.number;
      }
    }
    if (markedCount === matrixSize) {
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

const notInWinningArray = (winningBoardMap, inputArrayMatrix) => {
  let flag = true;
  for (let i = 0; i <= winningBoardMap.length - 1; i++) {
    if (areSameArray(winningBoardMap[i], inputArrayMatrix)) {
      flag = false;
      return flag;
    }
  }
  return flag;
};

const areSameArray = (array1, array2) => {
  //console.log(array1)
  let flag = true;
  for (let i = 0; i <= array1.length - 1; i++) {
    if (array1[i].number != array2[i].number) {
      flag = false;
      break;
    }
  }
  return flag;
};
