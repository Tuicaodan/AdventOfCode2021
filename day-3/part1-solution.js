window.addEventListener("load", function () {

  const digitsLength = 12;

  let rotatedArray = Array.apply(null, Array(digitsLength)).map(function () {return [];})

  input.forEach(value => {
    for(let i = 0; i<= value.length-1; i++){
      rotatedArray[i].push(value.charAt(i));
    }
  });

  let finalBinaryArray = []

  rotatedArray.forEach(array => {
    const bianryForSingleArray = checkMostCommonBit(array)
    finalBinaryArray.push(bianryForSingleArray)
  });

  let gammaRate = "";
  let epsilonRate = "";

  finalBinaryArray.forEach( binaryString => {
    gammaRate += binaryString;
    epsilonRate += binaryString=="0"?"1":"0";
  });

  const finalResult = parseInt(gammaRate, 2)*parseInt(epsilonRate, 2)


  const resultOutput = this.document.querySelector(".result");
  resultOutput.innerHTML = `Final result: ${finalResult}`;

});

const checkMostCommonBit = (inputArray) => {
  let oneCount = 0;
  let zeroCount = 0;

  inputArray.forEach(number => {
    if(parseInt(number)==1){
      oneCount++;
    } else {
      zeroCount++
    }
  });

  if(oneCount==zeroCount){
    console.log("Warning, found same 0 and 1 count")
  }

  return oneCount>zeroCount?"1":"0";


}

