function getSubSet(set, arrayElement) {
  const subSet = [];

  for (const element of set) {
    subSet.push(element);
  }

  subSet.push(arrayElement);

  return subSet;
}

function generatePowerSet(arr) {
  const powerSet = [[]];

  for (const element of arr) {
    const previousLength = powerSet.length;

    for (let index = 0; index < previousLength; index += 1) {
      powerSet.push(getSubSet(powerSet[index], element));
    }
  }

  return powerSet;
}

/* ************ Test Segment ********** */

function areEqual(array1, array2) {
  return array1.join() === array2.join();
}

function getMark(hasPassed) {
  return hasPassed ? '✅ ' : '❌ ';
}

function testGenetatePowerSet(array, expected) {
  const actual = generatePowerSet(array);
  const hasPassed = areEqual(actual, expected);
  const status = getMark(hasPassed);
  const message = " Array is : [" + array + "]";

  console.log(status, message, " Expected: ", expected, " Actual :", actual);
}

function testAll() {
  testGenetatePowerSet([], [[]]);

  testGenetatePowerSet([1], [[], [1]]);
  testGenetatePowerSet(['a'], [[], ['a']]);

  testGenetatePowerSet([1, 2], [[], [1], [2], [1, 2]]);

  testGenetatePowerSet([1, 2, 3], [[], [1], [2], [1, 2], [3], [1, 3], [2, 3],
  [1, 2, 3]]);
  testGenetatePowerSet(['a', 'b', 'c'], [[], ["a"], ["b"], ["a", "b"], ["c"],
  ["a", "c"], ["b", "c"], ["a", "b", "c"]]);

  testGenetatePowerSet([1, 2, 3, 4], [[], [1], [2], [1, 2], [3], [1, 3],
  [2, 3], [1, 2, 3], [4], [1, 4], [2, 4], [1, 2, 4], [3, 4], [1, 3, 4],
  [2, 3, 4], [1, 2, 3, 4]]);
}

testAll();