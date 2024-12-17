function includes(array, element) {
  for (const item of array) {
    if (item === element) {
      return true;
    }
  }

  return false;
}

function removeDuplicates(array) {
  const uniqueElements = [];

  for (const element of array) {
    if (!includes(uniqueElements, element)) {
      uniqueElements.push(element);
    }
  }

  return uniqueElements;
}

console.log(removeDuplicates([1, 2, 2, 2, 3, 3, 4, 4, 5, 6]));