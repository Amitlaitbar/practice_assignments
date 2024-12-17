const STAR = '*';
const SPACE = ' ';

function spaces(times) {
  return ' '.repeat(times);
}

function starts(times) {
  return '*'.repeat(times);
}

function getHorizontalLine(char, width) {
  return char.repeat(width);
}

function getHollowRow(width) {
  const hollowRow = [];

  hollowRow.push(spaces(width - 2));
  hollowRow.unshift(STAR);
  hollowRow.push(STAR);

  return hollowRow.join('');
}

function getRowLine(width, rowIndex) {
  return width !== 0 ? starts(width) :
    starts(rowIndex + 1);
}

function drawPattern([width, height]) {
  const pattern = [];

  for (let row = 0; row < height; row += 1) {
    const rowLine = getRowLine(width, row);
    pattern.push(rowLine);
  }

  return pattern;
}

function drawHollowRectangle([width, height]) {
  if (width <= 2 || height <= 2) {
    return drawPattern([width, height]);
  }

  const hollowRectangle = [];

  for (let row = 1; row <= height - 2; row += 1) {
    hollowRectangle.push(getHollowRow(width));
  }

  hollowRectangle.unshift(starts(width));
  hollowRectangle.push(starts(width));

  return hollowRectangle;
}

function drawAlternatingRectangle([width, height, chars]) {
  const alternatingRectangle = [];

  for (let row = 0; row < height; row += 1) {
    const rowString = getHorizontalLine(chars[row % chars.length], width);
    alternatingRectangle.push(rowString);
  }

  return alternatingRectangle;
}

function drawRightAlignedTriangle([size]) {
  const righAlignedTriangle = [];

  for (let row = 1; row <= size; row += 1) {
    const rowString = starts(row);
    righAlignedTriangle.push(rowString.padStart(size));
  }

  return righAlignedTriangle;
}

function getHollowRowForDia(index, size) {
  if (index === 1 || index === size) {
    return starts(size);
  }

  return STAR + spaces(size - 2) + STAR;
}

function createRow(style, index, times) {
  return style === 'diamond' ?
    starts(times) : getHollowRowForDia(index, times);
}

function drawHalfDiamond(size, style) {
  let row = [];
  let times = 1;
  let spaceTimes = Math.floor(size / 2);

  for (let index = 1; index <= Math.ceil(size / 2); index += 1) {
    const rowLine = createRow(style, index, times);

    row.push(spaces(spaceTimes) + rowLine);
    times += 2;
    spaceTimes -= 1;
  }

  return row;
}

function isEven(num) {
  return num % 2 === 0;
}

function drawDiamond([size, style]) {
  const updatedSize = isEven(size) ? size - 1 : size;
  const halfDiamond = drawHalfDiamond(updatedSize, style);
  const diamond = [];

  diamond.push(halfDiamond.join('\n'));

  for (let index = halfDiamond.length - 2; index >= 0; index -= 1) {
    diamond.push(halfDiamond[index]);
  }

  return diamond;
}

function isDiamondStyle(style) {
  return style === 'dimond' || style === 'hollow-diamond';
}

function getCombinedRow(firstPattern, secondPattern, dimensions) {
  if (firstPattern === undefined) {
    const emptyRow = spaces(dimensions[0]);
    return emptyRow + ' ' + secondPattern;
  }

  if (secondPattern === undefined) {
    const emptyRow = spaces(dimensions[0]);
    return firstPattern.padEnd(dimensions[0]) + ' ' + emptyRow;
  }

  return firstPattern.padEnd(dimensions[0]) + ' ' + secondPattern;
}

function drawWithSecondPattern(style, dimensions, secondStyle) {
  const pattern1 = generatePattern(style, dimensions).split('\n');
  const pattern2 = generatePattern(secondStyle, dimensions).split('\n');
  const combinedPattern = [];
  const lengthOfRow = pattern1.length > pattern2.length ? pattern1.length :
    pattern2.length;

  for (let index = 0; index < lengthOfRow; index += 1) {
    const row = getCombinedRow(pattern1[index], pattern2[index], dimensions);
    combinedPattern.push(row);
  }

  return combinedPattern.join('\n');
}

function generatePattern(style, dimensions, secondStyle) {
  if (dimensions[0] === 0 || dimensions[1] === 0) {
    return '';
  }

  if (secondStyle) {
    return drawWithSecondPattern(style, dimensions, secondStyle);
  }

  const width = dimensions[0];
  const height = dimensions[1];

  const patterns = [['filled-rectangle', drawPattern, [width, height]],
  ['hollow-rectangle', drawHollowRectangle, [width, height]],
  ['alternating-rectangle', drawAlternatingRectangle, [width, height,
    [STAR, '-']]],
  ['triangle', drawPattern, [0, dimensions[0]]],
  ['right-aligned-triangle', drawRightAlignedTriangle, [dimensions[0]]],
  ['spaced-alternating-rectangle', drawAlternatingRectangle,
    [width, height, [STAR, '-', ' ']]],
  ['diamond', drawDiamond, [dimensions[0], style]],
  ['hollow-diamond', drawDiamond, [dimensions[0], style]],
  ];

  for (const [patternStyle, method, parameters] of patterns) {
    if (style === patternStyle) {
      return method(parameters).join('\n');
    }
  }
}

/* ************* Test Segment ************* */

function testGeneratePattern(style, dimensions, expected, failed) {
  const actual = generatePattern(style, dimensions);

  if (actual !== expected) {
    failed.push([style, dimensions, actual, expected]);
  }
}

function testCombinePattern(style, dimensions, secondStyle, expected, failed) {
  const actual = drawWithSecondPattern(style, dimensions, secondStyle);

  if (actual !== expected) {
    failed.push([style, dimensions, secondStyle, actual, expected]);
  }
}

function testForFilledRect(failed) {
  testGeneratePattern('filled-rectangle', [0, 0], '', failed);
  testGeneratePattern('filled-rectangle', [1, 0], '', failed);
  testGeneratePattern('filled-rectangle', [2, 2], '**\n**', failed);
  testGeneratePattern('filled-rectangle', [2, 4], '**\n**\n**\n**', failed);
}

function testForHollowRect(failed) {
  testGeneratePattern("hollow-rectangle", [4, 3], '****\n*  *\n****', failed);
  testGeneratePattern("hollow-rectangle", [6, 2], '******\n******', failed);
  testGeneratePattern("hollow-rectangle", [5, 4], '*****\n*   *\n*   *\n*****', failed);
  testGeneratePattern("hollow-rectangle", [1, 5], '*\n*\n*\n*\n*', failed);
  testGeneratePattern("hollow-rectangle", [0, 3], '', failed);
}

function testForAlternatingRect(failed) {
  testGeneratePattern("alternating-rectangle", [3, 3], '***\n---\n***', failed);
  testGeneratePattern("alternating-rectangle", [5, 4], '*****\n-----\n*****\n-----', failed);
  testGeneratePattern("alternating-rectangle", [6, 2], '******\n------', failed);
  testGeneratePattern("alternating-rectangle", [4, 1], '****', failed);
  testGeneratePattern("alternating-rectangle", [0, 5], '', failed);
  testGeneratePattern("alternating-rectangle", [7, 0], '', failed);
}

function testForTriangle(failed) {
  testGeneratePattern("triangle", [3], '*\n**\n***', failed);
  testGeneratePattern("triangle", [5], '*\n**\n***\n****\n*****', failed);
  testGeneratePattern("triangle", [1], '*', failed);
  testGeneratePattern("triangle", [0], '', failed);
}

function testForRightAlignedTriangle(failed) {
  testGeneratePattern("right-aligned-triangle", [3], '  *\n **\n***', failed);
  testGeneratePattern("right-aligned-triangle", [5], '    *\n   **\n  ***\n ****\n*****', failed);
  testGeneratePattern("right-aligned-triangle", [1], '*', failed);
  testGeneratePattern("right-aligned-triangle", [0], '', failed);
}

function testForSpacedAlignedTriangle(failed) {
  testGeneratePattern("spaced-alternating-rectangle", [3, 4], '***\n---\n   \n***', failed);
  testGeneratePattern("spaced-alternating-rectangle", [5, 6], '*****\n-----\n     \n*****\n-----\n     ', failed);
  testGeneratePattern("spaced-alternating-rectangle", [4, 3], '****\n----\n    ', failed);
  testGeneratePattern("spaced-alternating-rectangle", [0, 3], '', failed);
  testGeneratePattern("spaced-alternating-rectangle", [7, 0], '', failed);
}

function testForDiamondPattern(failed) {
  testGeneratePattern("diamond", [3], ' *\n***\n *', failed);
  testGeneratePattern("diamond", [5], '  *\n ***\n*****\n ***\n  *', failed);
  testGeneratePattern("diamond", [4], ' *\n***\n *', failed);
  testGeneratePattern("diamond", [1], '*', failed);
  testGeneratePattern("diamond", [0], '', failed);
  testGeneratePattern("diamond", [2], '*', failed);
  testGeneratePattern("diamond", [7], '   *\n  ***\n *****\n*******\n *****\n  ***\n   *', failed);
  testGeneratePattern("diamond", [8], '   *\n  ***\n *****\n*******\n *****\n  ***\n   *', failed);
}

function testForHollowDiamond(failed) {
  testGeneratePattern("hollow-diamond", [3], ' *\n* *\n *', failed);
  testGeneratePattern("hollow-diamond", [7], '   *\n  * *\n *   *\n*     *' +
    '\n *   *\n  * *\n   *', failed);
  testGeneratePattern("hollow-diamond", [4], ' *\n* *\n *', failed);
  testGeneratePattern("hollow-diamond", [1], '*', failed);
  testGeneratePattern("hollow-diamond", [0], '', failed);
}

function testWithSecondPattern(failed) {
  testCombinePattern('filled-rectangle', [3, 3], 'hollow-rectangle', '*** ***\n*** * *\n*** ***', failed);
  testCombinePattern('triangle', [3], 'right-aligned-triangle', '*     *\n**   **\n*** ***', failed);
  testCombinePattern('diamond', [5], 'hollow-diamond', '  *     *\n ***   * *\n***** *   *\n ***   * *\n  *     *', failed);
  testCombinePattern('alternating-rectangle', [4, 3], 'spaced-alternating-rectangle', '**** ****\n---- ----\n****     ', failed);
  // testCombinePattern('diamond', [4], 'triangle', '', failed);
}

function testAll() {
  const failed = [];

  testForFilledRect(failed);
  testForHollowRect(failed);
  testForAlternatingRect(failed);
  testForTriangle(failed);
  testForRightAlignedTriangle(failed);
  testForSpacedAlignedTriangle(failed);
  testForDiamondPattern(failed);
  testForHollowDiamond(failed);
  testWithSecondPattern(failed);

  console.table(failed);
}

testAll();