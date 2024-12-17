function areEmpty(matrixA, matrixB) {
  return matrixA.length === 0 || matrixB.length === 0;
}

function areCompatible(matrixA, matrixB) {
  return matrixA[0].length === matrixB.length;
}

function getProductRow(matrixA, matrixB, row) {
  const productRow = [];

  for (let colIndex = 0; colIndex < matrixA.length; colIndex += 1) {
    let sum = 0;

    for (let rowIndex = 0; rowIndex < matrixB.length; rowIndex += 1) {
      sum += matrixA[row][rowIndex] * matrixB[rowIndex][colIndex];
    }

    productRow.push(sum);
  }

  return productRow;
}

function multiplyMatrices(matrixA, matrixB) {
  if (areEmpty(matrixA, matrixB)) {
    return [];
  }
  if (!areCompatible(matrixA, matrixB)) {
    return NaN;
  }

  const resultMatrix = [];

  for (let rowIndex = 0; rowIndex < matrixA.length; rowIndex += 1) {
    resultMatrix.push(getProductRow(matrixA, matrixB, rowIndex));
  }

  return resultMatrix;
}

/* ************ Test Segment ********** */

function areEqual(array1, array2) {
  if (isNaN(array1) || isNaN(array2)) {
    return true;
  }

  return array1.join() === array2.join();
}

function getMark(hasPassed) {
  return hasPassed ? '✅ ' : '❌ ';
}

function testMultiplyMatrices(matrixA, matrixB, expected) {
  const actual = multiplyMatrices(matrixA, matrixB);
  const hasPassed = areEqual(actual, expected);
  const status = getMark(hasPassed);
  const matrixASegment = "\n   MatrixA is : [" + matrixA + "] \n";
  const matrixBSegment = "   MatrixB is : [" + matrixB + "] \n";
  const msg = matrixASegment + matrixBSegment;

  console.log(status, msg, "  Expected: ", expected, "\n   Actual: ", actual);
}

function testAll() {
  testMultiplyMatrices([], [], []);
  testMultiplyMatrices([], [1], []);
  testMultiplyMatrices([[1], [3]], [[1], [2]], NaN);
  testMultiplyMatrices([[1, 2, 3], [4, 5, 6]], [[7, 8], [9, 10], [11, 12]],
    [[58, 64], [139, 154]]);
  testMultiplyMatrices([[1, 1, 1], [1, 1, 1], [1, 1, 1]], [[1, 1, 1], [1, 1, 1],
  [1, 1, 1]], [[3, 3, 3], [3, 3, 3], [3, 3, 3]]);

  testMultiplyMatrices([[2, 2], [1, 1]], [[1, 1], [1, 1]], [[4, 4], [2, 2]]);
  testMultiplyMatrices([[]], [[1]], NaN);
  testMultiplyMatrices([[0], [0]], [[0, 0]], [[0, 0], [0, 0]]);
}

testAll();