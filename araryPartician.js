// function reverseNumber(number) {
//   let numberCandidate = number;
//   let reversedNumber = 0;

//   while (numberCandidate > 0) {
//     const remainder = numberCandidate % 10;

//     reversedNumber = reversedNumber * 10 + remainder;
//     numberCandidate = Math.floor(numberCandidate / 10);
//   }

//   return reversedNumber;
// }

function splitNumber(num) {
  let persistNumber = num;
  const array = [];

  while (persistNumber > 1000) {
    const remainder = persistNumber % 1000;

    array.unshift(remainder);
    persistNumber = (persistNumber - remainder) / 1000;
  }

  array.unshift(persistNumber);
  return array;
}

console.log(splitNumber(1001));


// function convertNumberToFormat(number) {

//   const numberInString = '' + number;
//   const array = [];

//   for (let mainIndex = numberInString.length - 1; mainIndex >= 0; mainIndex -= 3) {
//     let threeDigitNumber = 0;
//     let index = mainIndex;

//     while (index > mainIndex - 3 && index !== -1) {
//       threeDigitNumber = threeDigitNumber * 10 + +numberInString.at(index);
//       index -= 1;
//     }

//     if (numberInString[numberInString.length - 1] === 0) {
//       threeDigitNumber = '0' + threeDigitNumber;
//     }

//     threeDigitNumber = reverseNumber(threeDigitNumber);
//     array.unshift(threeDigitNumber);
//   }

//   return array;
// }