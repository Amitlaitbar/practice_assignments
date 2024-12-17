const LINE_BREAK = '\n';
const EMPTY_STRING = '';

function slice(string) {
  let newString = EMPTY_STRING;

  for (let index = 0; index < string.length - 1; index += 1) {
    newString += string[index];
  }

  return newString;
}

function getHorizontalLine(char, noOfColumns) {
  let colString = EMPTY_STRING;

  for (let col = 0; col < noOfColumns; col += 1) {
    colString += char;
  }

  return colString;
}

function getLineWithSpaces(char, noOfColumns) {
  let lineString = EMPTY_STRING;

  for (let col = 0; col < noOfColumns; col += 1) {
    lineString += col === 0 || col === noOfColumns - 1 ? char : ' ';
  }

  return lineString;
}

function drawHollowRectangle(dimensions) {
  let hollowRectangle = EMPTY_STRING;

  for (let row = 0; row < dimensions[1]; row += 1) {
    hollowRectangle += row === 0 || row === dimensions[1] - 1 ?
      getHorizontalLine('*', dimensions[0]) : getLineWithSpaces('*', dimensions[0]);

    hollowRectangle += LINE_BREAK;
  }

  return slice(hollowRectangle);
}

function getTriangle(dimensions) {
  let triangleString = EMPTY_STRING;

  for (let row = 0; row < dimensions[0]; row += 1) {
    triangleString += getHorizontalLine('*', row + 1) + LINE_BREAK;
  }

  return slice(triangleString);
}

function drawPattern(dimensions) {
  let rectangle = '';

  for (let row = 0; row < dimensions[1]; row += 1) {
    // const colLength = dimensions[0]
    rectangle += getHorizontalLine('*', dimensions[0]) + LINE_BREAK;
  }

  return slice(rectangle);
}

function drawRightAlignedTriangle(size, char) {
  let triangleString = EMPTY_STRING;

  for (let row = 0; row < size[0]; row += 1) {
    for (let col = 0; col < size[0]; col += 1) {
      triangleString += row <= col ? '*' : ' ';
    }
    triangleString += LINE_BREAK;
  }

  return slice(triangleString);
}

function drawAlternatingRectangle(dimensions) {
  let alternatingRectangle = EMPTY_STRING;

  for (let row = 0; row < dimensions[1]; row += 1) {
    alternatingRectangle += row % 2 === 0 ?
      getHorizontalLine('*', dimensions[0]) :
      getHorizontalLine('-', dimensions[0]);

    alternatingRectangle += LINE_BREAK;
  }

  return slice(alternatingRectangle);
}

function getSpacedAlternatingRectangle(dimensions) {
  let spacedAlternatingRectangle = [];
  let charIndex = 0;
  const chars = ['*', '-', ' '];

  for (let row = 0; row < dimensions[1]; row += 1) {
    if (charIndex === 3) {
      charIndex = 0;
    }

    spacedAlternatingRectangle.push(getHorizontalLine(chars[charIndex], dimensions[0]));
    charIndex += 1;
  }

  return spacedAlternatingRectangle.join(LINE_BREAK);
}

function generatePattern(style, dimensions) {
  if (dimensions[0] === 0) {
    return EMPTY_STRING;
  }

  if (style === 'hollow-rectangle') {
    return drawHollowRectangle(dimensions);
  }

  if (style === 'alternating-rectangle') {
    return drawAlternatingRectangle(dimensions, ['*', '-']);
  }

  if (style === 'triangle') {
    return getTriangle(dimensions);
  }

  if (style === 'right-aligned-triangle') {
    return drawRightAlignedTriangle(dimensions);
  }

  if (style === 'spaced-alternating-rectangle') {
    return getSpacedAlternatingRectangle(dimensions);
  }

  return drawPattern(dimensions);
}

function testGeneratePattern(style, dimensions, expected, failed) {
  const actual = generatePattern(style, dimensions);
  if (actual !== expected) {
    failed.push([style, dimensions, actual, expected]);
  }
}

function testAll() {
  const failed = [];
  testGeneratePattern('filled-rectangle', [0, 0], EMPTY_STRING, failed);
  testGeneratePattern('filled-rectangle', [1, 0], EMPTY_STRING, failed);
  testGeneratePattern('filled-rectangle', [0, 1], EMPTY_STRING, failed);
  testGeneratePattern('filled-rectangle', [2, 2], '**\n**', failed);
  testGeneratePattern('filled-rectangle', [2, 4], '**\n**\n**\n**', failed);
  testGeneratePattern('filled-rectangle', [5, 3], '*****\n*****\n*****', failed);

  testGeneratePattern("hollow-rectangle", [4, 3], '****\n*  *\n****', failed);
  testGeneratePattern("hollow-rectangle", [6, 2], '******\n******', failed);
  testGeneratePattern("hollow-rectangle", [5, 4], '*****\n*   *\n*   *\n*****', failed);
  testGeneratePattern("hollow-rectangle", [1, 5], '*\n*\n*\n*\n*', failed);
  testGeneratePattern("hollow-rectangle", [0, 3], '', failed);

  testGeneratePattern("alternating-rectangle", [3, 3], '***\n---\n***', failed);
  testGeneratePattern("alternating-rectangle", [5, 4], '*****\n-----\n*****\n-----', failed);
  testGeneratePattern("alternating-rectangle", [6, 2], '******\n------', failed);
  testGeneratePattern("alternating-rectangle", [4, 1], '****', failed);
  testGeneratePattern("alternating-rectangle", [0, 5], EMPTY_STRING, failed);
  testGeneratePattern("alternating-rectangle", [7, 0], EMPTY_STRING, failed);


  testGeneratePattern("triangle", [3], '*\n**\n***', failed);
  testGeneratePattern("triangle", [5], '*\n**\n***\n****\n*****', failed);
  testGeneratePattern("triangle", [1], '*', failed);
  testGeneratePattern("triangle", [0], '', failed);

  testGeneratePattern("right-aligned-triangle", [3], '  *\n **\n***', failed);
  testGeneratePattern("right-aligned-triangle", [5], '    *\n   **\n  ***\n ****\n*****', failed);
  testGeneratePattern("right-aligned-triangle", [1], '*', failed);
  testGeneratePattern("right-aligned-triangle", [0], '', failed);

  testGeneratePattern("spaced-alternating-rectangle", [3, 4], '***\n---\n   \n***', failed);
  testGeneratePattern("spaced-alternating-rectangle", [5, 6], '*****\n-----\n     \n*****\n-----\n     ', failed);
  testGeneratePattern("spaced-alternating-rectangle", [4, 3], '****\n----\n    ', failed);
  testGeneratePattern("spaced-alternating-rectangle", [0, 3], '', failed);
  testGeneratePattern("spaced-alternating-rectangle", [7, 0], '', failed);

  console.table(failed);
}

testAll();