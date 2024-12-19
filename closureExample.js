const something = function () {
  const fns = [];

  let i = 0;
  while (i < 3) {
    fns.push(function () { return i; });
    i += 1;
  }

  return fns;
};

const add = function (init, element) {
  const value = element();

  return init + value;
};

const manyThings = something();
console.log(manyThings.reduce(add, 0));