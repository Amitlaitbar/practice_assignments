const BASIC_NUM_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six',
  'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
  'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const DECADE_WORDS = ['twenty', 'thirty', 'forty', 'fifty', 'sixty',
  'seventy', 'eighty', 'ninety'];
const PLACE_UNITS = ["", 'thousand', 'million', 'billion'];

function getDigit(num, pos) {
  const numInString = num + '';   // don't convert into string

  return +numInString[numInString.length - pos];
}

function spellNumberUpto99(num) {
  const unitDigit = getDigit(num, 1);
  const decadeDigit = getDigit(num, 2);

  if (num <= 20) {
    return BASIC_NUM_WORDS[num];
  }

  if (unitDigit === 0) {
    return DECADE_WORDS[decadeDigit - 2];
  }

  const numberInWord = [];
  numberInWord.push(DECADE_WORDS[decadeDigit - 2], BASIC_NUM_WORDS[unitDigit]);

  return numberInWord.join(" ");
}

function spellNumberUpto999(num) {
  if (num < 100) {
    return spellNumberUpto99(num);
  }

  const numberInWord = [];
  const centuryDigit = getDigit(num, 3);

  numberInWord.push(BASIC_NUM_WORDS[centuryDigit], 'hundred');

  if (num % 100 === 0) {
    return numberInWord.join(" ");
  }

  numberInWord.push(spellNumberUpto99(num % 100));

  return numberInWord.join(" ");
}

function spellNumberAbove999(num, numberInWord, index) {
  if (num === 0) {
    return numberInWord.join(" ");
  }

  let number = num;
  const remainder = number % 1000;

  if (remainder !== 0) {
    if (index !== 0) {p
      numberInWord.unshift(PLACE_UNITS[index]);
    }
    numberInWord.unshift(spellNumberUpto999(remainder));
  }

  number = Math.floor(number / 1000);

  return spellNumberAbove999(number, numberInWord, index + 1);
}

function numberToWords(num) {
  if (num <= 20) {
    return BASIC_NUM_WORDS[num];
  }

  if (num < 1000) {
    return spellNumberUpto999(num);
  }

  return spellNumberAbove999(num, [], 0);
}

/* ************ Test Segment ********** */

function getMark(hasPassed) {
  return hasPassed ? '✅ ' : '❌ ';
}

function testNumberToWord(num, expected) {
  const actual = numberToWords(num);
  const hasPassed = actual === expected;

  console.log(getMark(hasPassed) + num + ' = ' + actual);
}

function test0To100() {
  testNumberToWord(6, 'six');
  testNumberToWord(1, 'one');
  testNumberToWord(8, 'eight');
  testNumberToWord(0, 'zero');
  testNumberToWord(9, 'nine');
  testNumberToWord(10, 'ten');
  testNumberToWord(11, 'eleven');
  testNumberToWord(13, 'thirteen');
  testNumberToWord(19, 'nineteen');
  testNumberToWord(20, 'twenty');
  testNumberToWord(30, 'thirty');
  testNumberToWord(71, 'seventy one');
  testNumberToWord(99, 'ninety nine');
  testNumberToWord(56, 'fifty six');
  testNumberToWord(96, 'ninety six');
  testNumberToWord(100, 'one hundred');
}

function test101To1000() {
  testNumberToWord(101, 'one hundred one');
  testNumberToWord(111, 'one hundred eleven');
  testNumberToWord(120, 'one hundred twenty');
  testNumberToWord(140, 'one hundred forty');
  testNumberToWord(150, 'one hundred fifty');
  testNumberToWord(576, 'five hundred seventy six');
  testNumberToWord(777, 'seven hundred seventy seven');
  testNumberToWord(999, 'nine hundred ninety nine');
  testNumberToWord(1000, 'one thousand');
}

function testForThousand() {
  testNumberToWord(1001, 'one thousand one');
  testNumberToWord(1101, 'one thousand one hundred one');
  testNumberToWord(1111, 'one thousand one hundred eleven');
  testNumberToWord(10001, 'ten thousand one');
  testNumberToWord(999999, 'nine hundred ninety nine thousand nine hundred ' +
    'ninety nine');
  testNumberToWord(23000, 'twenty three thousand');
  testNumberToWord(23023, 'twenty three thousand twenty three');
  testNumberToWord(23020, 'twenty three thousand twenty');
  testNumberToWord(600000, 'six hundred thousand');
  testNumberToWord(600001, 'six hundred thousand one');
}

function testForMillion() {
  testNumberToWord(999999999, 'nine hundred ninety nine million nine hundred'
    + ' ninety nine thousand nine hundred ninety nine');
  testNumberToWord(999999999999, 'nine hundred ninety nine billion nine hundred'
    + ' ninety nine million nine hundred ninety nine thousand nine hundred ' +
    'ninety nine');
  testNumberToWord(10000001, 'ten million one');
  testNumberToWord(5367212, 'five million three hundred sixty seven thousand '
    + 'two hundred twelve');
  testNumberToWord(1000001, 'one million one');
  testNumberToWord(6000000, 'six million');
  testNumberToWord(6000001, 'six million one');
}

function testForBillion() {
  testNumberToWord(10000000000, 'ten billion');
  testNumberToWord(10600000001, 'ten billion six hundred million one');
  testNumberToWord(10600000010, 'ten billion six hundred million ten');
  testNumberToWord(10600000550, 'ten billion six hundred million five hundred '
    + 'fifty');
}

function testAll() {
  test0To100();
  test101To1000();
  testForThousand();
  testForMillion();
  testForBillion();
}

testAll();