// Helper function to check and display test results
function checkTest(testName, actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`✅ ${testName} PASSED`);
  } else {
    console.log(`❌ ${testName} FAILED`);
    console.log(`   Expected: ${JSON.stringify(expected)}`);
    console.log(`   Got: ${JSON.stringify(actual)}`);
  }
}

// Challenge 1
function addTwo(num) {
  return num + 2;
}

// Test Challenge 1
console.log("\n--- Challenge 1: addTwo ---");
checkTest("addTwo(3)", addTwo(3), 5);
checkTest("addTwo(10)", addTwo(10), 12);

// Challenge 2
function addS(word) {
  return `${word}s`;
}

// Test Challenge 2
console.log("\n--- Challenge 2: addS ---");
checkTest('addS("pizza")', addS("pizza"), "pizzas");
checkTest('addS("bagel")', addS("bagel"), "bagels");

// Challenge 3
function map(array, callback) {
  const resArray = [];
  for (let i = 0; i < array.length; i++) {
    resArray.push(callback(array[i]));
  }
  return resArray;
}

// Test Challenge 3
console.log("\n--- Challenge 3: map ---");
checkTest("map([1, 2, 3], addTwo)", map([1, 2, 3], addTwo), [3, 4, 5]);
checkTest("map([2, 4, 6], addTwo)", map([2, 4, 6], addTwo), [4, 6, 8]);

// // Challenge 4
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    array[i] = callback(array[i]);
  }
}

// Test Challenge 4
console.log("\n--- Challenge 4: forEach ---");
let testArray = [];

forEach([1, 2, 3], (num) => testArray.push(num + 2));
checkTest("forEach with pushing values", testArray, [3, 4, 5]);

// Challenge 5
function mapWith(array, callback) {
  const newArray = [...array];
  forEach(newArray, callback);
  return newArray;
}

// Test Challenge 5
console.log("\n--- Challenge 5: mapWith ---");
checkTest("mapWith([1, 2, 3], addTwo)", mapWith([1, 2, 3], addTwo), [3, 4, 5]);
checkTest("mapWith([2, 4, 6], addTwo)", mapWith([2, 4, 6], addTwo), [4, 6, 8]);

// Challenge 6
function reduce(array, callback, initialValue) {
  for (let i = 0; i < array.length; i++) {
    initialValue = callback(initialValue, array[i]);
  }
  return initialValue;
}

// Test Challenge 6
console.log("\n--- Challenge 6: reduce ---");
const sum = (a, b) => a + b;
checkTest("reduce([1, 2, 3], sum, 0)", reduce([1, 2, 3], sum, 0), 6);
checkTest("reduce([1, 2], sum, 5)", reduce([1, 2], sum, 5), 8);

// Challenge 7
function intersection(arrays) {
  const resArr = arrays.shift();

  return reduce(
    arrays,
    (a, b) => {
      const arr = [];
      forEach(a, (el) => {
        if (b.includes(el)) arr.push(el);
      });
      return arr;
    },
    resArr,
  );
}

// Test Challenge 7
console.log("\n--- Challenge 7: intersection ---");
checkTest(
  "intersection([[5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]])",
  intersection([
    [5, 10, 15, 20],
    [15, 88, 1, 5, 7],
    [1, 10, 15, 5, 20],
  ]),
  [5, 15],
);

// Challenge 8
function union(arrays) {
  const resArr = arrays.shift();

  return reduce(
    arrays,
    (a, b) => {
      const arr = [...a];
      b.forEach((el) => {
        if (!a.includes(el)) {
          arr.push(el);
        }
      });
      return arr;
    },
    resArr,
  );
}

// Test Challenge 8
console.log("\n--- Challenge 8: union ---");
checkTest(
  "union([[5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]])",
  union([
    [5, 10, 15],
    [15, 88, 1, 5, 7],
    [100, 15, 10, 1, 5],
  ]),
  [5, 10, 15, 88, 1, 7, 100],
);

// Challenge 9
function objOfMatches(array1, array2, callback) {
  const result = {};
  array1.forEach((el, index) => {
    if (callback(el) === array2[index]) result[el] = array2[index];
  });
  return result;
}

// Test Challenge 9
console.log("\n--- Challenge 9: objOfMatches ---");
checkTest(
  "objOfMatches test",
  objOfMatches(
    ["hi", "howdy", "bye", "later", "hello"],
    ["HI", "Howdy", "BYE", "LATER", "hello"],
    (str) => str.toUpperCase(),
  ),
  { hi: "HI", bye: "BYE", later: "LATER" },
);

// Challenge 10
function multiMap(arrVals, arrCallbacks) {
  return arrVals.reduce((res, el) => {
    res[el] = arrCallbacks.map((func) => func(el));
    return res;
  }, {});
}

// Test Challenge 10
console.log("\n--- Challenge 10: multiMap ---");
checkTest(
  "multiMap test",
  multiMap(
    ["catfood", "glue", "beer"],
    [
      (str) => str.toUpperCase(),
      (str) => str[0].toUpperCase() + str.slice(1).toLowerCase(),
      (str) => str + str,
    ],
  ),
  {
    catfood: ["CATFOOD", "Catfood", "catfoodcatfood"],
    glue: ["GLUE", "Glue", "glueglue"],
    beer: ["BEER", "Beer", "beerbeer"],
  },
);

// Challenge 11
function objectFilter(obj, callback) {
  let [keys, values] = [Object.keys(obj), Object.values(obj)];
  let index = 0;

  return keys.reduce((res, el) => {
    let val = callback(el);
    if (val === values[index++]) res[el] = val;

    return res;
  }, {});
}

// Test Challenge 11
console.log("\n--- Challenge 11: objectFilter ---");
const cities = {
  London: "LONDON",
  LA: "Los Angeles",
  Paris: "PARIS",
};
checkTest(
  "objectFilter cities test",
  objectFilter(cities, (city) => city.toUpperCase()),
  { London: "LONDON", Paris: "PARIS" },
);

// Challenge 12
function majority(array, callback) {
  const threshold = Math.trunc(array.length / 2) + 1;
  let count = 0;

  for (const item of array) {
    count = callback(item) ? count + 1 : count;
    if (count === threshold) {
      return true;
    }
  }

  return false;
}

// Test Challenge 12
console.log("\n--- Challenge 12: majority ---");
const isOdd = function (num) {
  return num % 2 === 1;
};
checkTest(
  "majority([1, 2, 3, 4, 5], isOdd)",
  majority([1, 2, 3, 4, 5], isOdd),
  true,
);
checkTest(
  "majority([2, 3, 4, 5], isOdd)",
  majority([2, 3, 4, 5], isOdd),
  false,
);

// Challenge 13
function prioritize(array, callback) {
  const trueValues = [];
  const falseValues = [];

  array.forEach((el) => {
    if (callback(el)) {
      trueValues.push(el);
      return;
    }

    falseValues.push(el);
  });

  return trueValues.concat(falseValues);
}

// Test Challenge 13
console.log("\n--- Challenge 13: prioritize ---");
const startsWithS = function (str) {
  return str[0].toLowerCase() === "s";
};
checkTest(
  "prioritize test",
  prioritize(
    ["curb", "rickandmorty", "seinfeld", "sunny", "friends"],
    startsWithS,
  ),
  ["seinfeld", "sunny", "curb", "rickandmorty", "friends"],
);

// Challenge 14
function countBy(array, callback) {
  return array.reduce((res, el) => {
    const value = callback(el);
    if (Object.keys(res).includes(value)) {
      res[value]++;
    } else {
      res[value] = 1;
    }
    return res;
  }, {});
}

// Test Challenge 14
console.log("\n--- Challenge 14: countBy ---");
checkTest(
  "countBy test",
  countBy([1, 2, 3, 4, 5], function (num) {
    if (num % 2 === 0) return "even";
    return "odd";
  }),
  { odd: 3, even: 2 },
);

// Challenge 15
function groupBy(array, callback) {
  return array.reduce((res, el) => {
    const value = callback(el);
    if (Object.keys(res).includes(`${value}`)) {
      res[value].push(el);
      console.log(res[value]);
    } else {
      res[value] = [el];
    }
    return res;
  }, {});
}

// Test Challenge 15
console.log("\n--- Challenge 15: groupBy ---");
const decimals = [1.3, 2.1, 2.4];
const floored = function (num) {
  return Math.floor(num);
};
checkTest("groupBy test", groupBy(decimals, floored), {
  1: [1.3],
  2: [2.1, 2.4],
});

// Challenge 16
function goodKeys(obj, callback) {
  let keys = Object.keys(obj);
  return keys.reduce((res, el) => {
    return callback(obj[el]) ? [...res, el] : res;
  }, []);
}

// Test Challenge 16
console.log("\n--- Challenge 16: goodKeys ---");
const sunny = {
  mac: "priest",
  dennis: "calculating",
  charlie: "birdlaw",
  dee: "bird",
  frank: "warthog",
};
const startsWithBird = function (str) {
  return str.slice(0, 4).toLowerCase() === "bird";
};
checkTest("goodKeys test", goodKeys(sunny, startsWithBird), ["charlie", "dee"]);

// Challenge 17
function commutative(func1, func2, value) {
  return func1(func2(value)) === func2(func1(value));
}

// Test Challenge 17
console.log("\n--- Challenge 17: commutative ---");
const multBy3 = (n) => n * 3;
const divBy4 = (n) => n / 4;
const subtract5 = (n) => n - 5;
checkTest(
  "commutative(multBy3, divBy4, 11)",
  commutative(multBy3, divBy4, 11),
  true,
);
checkTest(
  "commutative(multBy3, subtract5, 10)",
  commutative(multBy3, subtract5, 10),
  false,
);
checkTest(
  "commutative(divBy4, subtract5, 48)",
  commutative(divBy4, subtract5, 48),
  false,
);

// Challenge 18
function objFilter(obj, callback) {
  return Object.keys(obj).reduce((res, el) => {
    return callback(el) === obj[el] ? { ...res, [el]: obj[el] } : res;
  }, {});
}

// Test Challenge 18
console.log("\n--- Challenge 18: objFilter ---");
const startingObj = {};
startingObj[6] = 3;
startingObj[2] = 1;
startingObj[12] = 4;
const half = (n) => n / 2;
checkTest("objFilter test", objFilter(startingObj, half), { 2: 1, 6: 3 });

// Challenge 19
function rating(arrOfFuncs, value) {
  let trueCount = arrOfFuncs.reduce((acc, func) => {
    return func(value) ? acc + 1 : acc;
  }, 0);
  return (trueCount / arrOfFuncs.length) * 100;
}

// Test Challenge 19
console.log("\n--- Challenge 19: rating ---");
const isEven = (n) => n % 2 === 0;
const greaterThanFour = (n) => n > 4;
const isSquare = (n) => Math.sqrt(n) % 1 === 0;
const hasSix = (n) => n.toString().includes("6");
const checks = [isEven, greaterThanFour, isSquare, hasSix];
checkTest("rating(checks, 64)", rating(checks, 64), 100);
checkTest("rating(checks, 66)", rating(checks, 66), 75);

// Challenge 20
function pipe(arrOfFuncs, value) {
  return arrOfFuncs.reduce((acc, func) => {
    return func(acc);
  }, value);
}

// Test Challenge 20
console.log("\n--- Challenge 20: pipe ---");
const capitalize = (str) => str.toUpperCase();
const addLowerCase = (str) => str + str.toLowerCase();
const repeat = (str) => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
checkTest("pipe test", pipe(capAddlowRepeat, "cat"), "CATcatCATcat");

// Challenge 21
function highestFunc(objOfFuncs, subject) {
  let highest = {
    index: null,
    value: null,
  };
  Object.values(objOfFuncs).forEach((func, i) => {
    if (i == 0) {
      highest.index = 0;
      highest.value = func(subject);

      return;
    }
    let value = func(subject);
    highest = value > highest.value ? { index: i, value: value } : highest;
  });

  return Object.keys(objOfFuncs)[highest.index];
}

// Test Challenge 21
console.log("\n--- Challenge 21: highestFunc ---");
const groupOfFuncs = {};
groupOfFuncs.double = (n) => n * 2;
groupOfFuncs.addTen = (n) => n + 10;
groupOfFuncs.inverse = (n) => n * -1;
checkTest(
  "highestFunc(groupOfFuncs, 5)",
  highestFunc(groupOfFuncs, 5),
  "addTen",
);
checkTest(
  "highestFunc(groupOfFuncs, 11)",
  highestFunc(groupOfFuncs, 11),
  "double",
);
checkTest(
  "highestFunc(groupOfFuncs, -20)",
  highestFunc(groupOfFuncs, -20),
  "inverse",
);

// Challenge 22
function combineOperations(startVal, arrOfFuncs) {
  return arrOfFuncs.reduce((acc, func) => {
    return func(acc);
  }, startVal);
}

// Test Challenge 22
console.log("\n--- Challenge 22: combineOperations ---");
function add100(num) {
  return num + 100;
}
function divByFive(num) {
  return num / 5;
}
function multiplyByThree(num) {
  return num * 3;
}
function multiplyFive(num) {
  return num * 5;
}
function addTen(num) {
  return num + 10;
}

checkTest(
  "combineOperations(0, [add100, divByFive, multiplyByThree])",
  combineOperations(0, [add100, divByFive, multiplyByThree]),
  60,
);
checkTest(
  "combineOperations(0, [divByFive, multiplyFive, addTen])",
  combineOperations(0, [divByFive, multiplyFive, addTen]),
  10,
);

// Challenge 23
function myFunc(array, callback) {
  let result = -1;

  for (const [index, value] of array.entries()) {
    if (callback(value)) return index;
  }

  return result;
}

// Test Challenge 23
console.log("\n--- Challenge 23: myFunc ---");
const numbers = [2, 3, 6, 64, 10, 8, 12];
const evens = [2, 4, 6, 8, 10, 12, 64];
function newIsOdd(num) {
  return num % 2 !== 0;
}

checkTest("myFunc(numbers, isOdd)", myFunc(numbers, newIsOdd), 1);
checkTest("myFunc(evens, isOdd)", myFunc(evens, newIsOdd), -1);

{
  // Challenge 24
  function myForEach(array, callback) {
    for (const [index, value] of array.entries()) {
      callback(value);
    }
  }

  // Test Challenge 24
  console.log("\n--- Challenge 24: myForEach ---");
  let sum = 0;
  function addToSum(num) {
    sum += num;
  }
  const nums = [1, 2, 3];
  myForEach(nums, addToSum);
  checkTest("myForEach sum test", sum, 6);
}
