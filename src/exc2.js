// Test Helper Function
function checkTest(testName, actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`✅ ${testName} PASSED`);
  } else {
    console.log(`❌ ${testName} FAILED`);
    console.log(`   Expected: ${JSON.stringify(expected)}`);
    console.log(`   Got: ${JSON.stringify(actual)}`);
  }
}

/*
Challenge 1: Function Creation
Create a function 'createFunction' that creates and returns a function.
When the created function is called, it should return the string 'hello'.
This tests your understanding of basic function creation and return values.
*/
function createFunction() {
  return () => {
    return "hello";
  };
}

// Tests for Challenge 1
function testCreateFunction() {
  const createdFunc = createFunction();
  checkTest(
    "createFunction returns a function",
    typeof createdFunc,
    "function",
  );
  checkTest("returned function outputs 'hello'", createdFunc(), "hello");
}

/*
Challenge 2: Function with Input Memory
Create a function 'createFunctionPrinter' that takes an input parameter.
It should return a function that when called, returns the input that was passed to createFunctionPrinter.
This demonstrates closure by "remembering" the input parameter.
*/
function createFunctionPrinter(input) {
  return () => input;
}

// Tests for Challenge 2
function testCreateFunctionPrinter() {
  const printSample = createFunctionPrinter("sample");
  const printHello = createFunctionPrinter("hello");

  checkTest("printer function remembers 'sample'", printSample(), "sample");
  checkTest("printer function remembers 'hello'", printHello(), "hello");
  checkTest(
    "different printer functions maintain different inputs",
    [printSample(), printHello()].join(","),
    "sample,hello",
  );
}

/*
Challenge 3: Counter Closure
Examine and implement functions that demonstrate closure by maintaining
a private counter variable that can't be accessed directly from outside.
Then implement addByX which creates functions that add a specific number to their input.
*/
function outer() {
  let counter = 0;
  function incrementCounter() {
    counter++;
    return counter;
  }
  return incrementCounter;
}

function addByX(x) {
  return (y) => y + x;
}

// Tests for Challenge 3
function testOuter() {
  const counter1 = outer();
  const counter2 = outer();

  checkTest(
    "counter1 increments independently",
    [counter1(), counter1(), counter1()].join(","),
    "1,2,3",
  );

  checkTest(
    "counter2 maintains separate count",
    [counter2(), counter1()].join(","),
    "1,4",
  );
}

function testAddByX() {
  const addByTwo = addByX(2);
  const addByThree = addByX(3);

  checkTest(
    "addByTwo adds 2 to input",
    [addByTwo(1), addByTwo(2), addByTwo(3)].join(","),
    "3,4,5",
  );

  checkTest(
    "addByThree adds 3 to input",
    [addByThree(1), addByThree(2)].join(","),
    "4,5",
  );
}

/*
Challenge 4: One-Time Function Execution
Create a function 'once' that ensures the input function can only be executed once.
Subsequent calls should return the result from the first execution.
This pattern is useful for initialization and configuration operations.
*/
function once(func) {
  let memo = null;

  return () => {
    if (!memo) {
      memo = func();
    }

    return memo;
  };
}

// Tests for Challenge 4
function testOnce() {
  let counter = 0;
  const increment = () => (counter += 1);
  const onceFunc = once(increment);

  checkTest("first call executes function", onceFunc(), 1);
  checkTest("second call returns first result", onceFunc(), 1);
  checkTest("third call returns first result", onceFunc(), 1);
}

/*
Challenge 5: After N Times Function
Create a function 'after' that takes:
1. count (number) - how many times the function needs to be called
2. func (function) - the function to execute after count calls
Returns a function that will only execute func after it has been called count times.
*/
function after(count, func) {
  const final_count = count;
  let curr_count = 0;
  return () => {
    if (++curr_count >= final_count) {
      return func();
    }
  };
}

// Tests for Challenge 5
function testAfter() {
  let counter = 0;
  const increment = () => {
    counter += 1;
    return counter;
  };
  const afterCalled = after(3, increment);

  checkTest("first call returns undefined", afterCalled(), undefined);
  checkTest("second call returns undefined", afterCalled(), undefined);
  checkTest("third call executes function", afterCalled(), 1);
  checkTest("subsequent calls continue executing", afterCalled(), 2);
}

/*
Challenge 6: Delay Function Execution
Create a function 'delay' that accepts:
1. func (function) - function to be executed
2. wait (number) - milliseconds to wait before execution
3. ...args - any additional arguments to pass to func
The function should delay the execution of func by wait milliseconds.
*/
function delay(func, wait, ...args) {
  setTimeout(() => {
    func(...args);
  }, wait);
}

// Tests for Challenge 6
function testDelay() {
  // Note: This test is async and requires manual verification
  let called = false;
  const testFunc = () => {
    called = true;
    return "called";
  };
  delay(testFunc, 1000);

  setTimeout(() => {
    checkTest("function not called immediately", called, false);
  }, 500);

  setTimeout(() => {
    checkTest("function called after delay", called, true);
  }, 1500);
}

/*
Challenge 7: Sequential Iterator
Create a function 'rollCall' that accepts an array of names.
Returns a function that, when called repeatedly:
1. Outputs the next name in the array
2. After all names are called, outputs "Everyone accounted for"
*/
function rollCall(names) {
  let index = 0;
  return () => {
    if (index === names.length) return "Everyone accounted for";

    return names[index++];
  };
}

// Tests for Challenge 7
function testRollCall() {
  const rollCaller = rollCall(["Victoria", "Juan", "Ruth"]);

  checkTest("first call returns first name", rollCaller(), "Victoria");
  checkTest("second call returns second name", rollCaller(), "Juan");
  checkTest("third call returns third name", rollCaller(), "Ruth");
  checkTest(
    "subsequent calls indicate completion",
    rollCaller(),
    "Everyone accounted for",
  );
}

/*
Challenge 8: Function Output Cache
Create a function 'saveOutput' that accepts:
1. func (function) - a function to be wrapped
2. password (string) - the password to access results
Returns a function that acts like func but saves all inputs/outputs.
When the password is provided as input, it returns an object of saved results.
*/
function saveOutput(func, password) {
  const memo = {};

  return (input) => {
    if (input === password) return memo;

    memo[input] = func(input);
    return memo[input];
  };
}

// Tests for Challenge 8
function testSaveOutput() {
  const multiply = (n) => n * 2;
  const saved = saveOutput(multiply, "secret");

  checkTest("function works normally", saved(5), 10);
  checkTest("another normal operation", saved(10), 20);
  checkTest("password returns cache object", saved("secret"), {
    5: 10,
    10: 20,
  });
}

/*
Challenge 9: Cyclic Iterator
Create a function 'cycleIterator' that accepts an array.
Returns a function that when called, returns the next element in the array.
After reaching the end, it should start over from the beginning.
*/
function cycleIterator(array) {
  let i = 0;
  return () => {
    if (i === array.length) i = 0;
    return array[i++];
  };
}

// Tests for Challenge 9
function testCycleIterator() {
  const cycle = cycleIterator(["a", "b", "c"]);

  checkTest(
    "first cycle through array",
    [cycle(), cycle(), cycle()].join(","),
    "a,b,c",
  );
  checkTest(
    "cycles back to beginning",
    [cycle(), cycle(), cycle()].join(","),
    "a,b,c",
  );
}

/*
Challenge 10: Partial Application
Create a function 'defineFirstArg' that accepts:
1. func (function) - the function to modify
2. arg (any) - the argument to permanently set as first parameter
Returns a new function that calls func with arg as first argument.
Additional arguments are passed normally.
*/
function defineFirstArg(func, arg) {
  return (...args) => {
    return func(arg, ...args);
  };
}

// Tests for Challenge 10
function testDefineFirstArg() {
  const subtract = (a, b) => a - b;
  const subFrom20 = defineFirstArg(subtract, 20);

  checkTest("uses fixed first argument", subFrom20(5), 15);
  checkTest(
    "works with different second arguments",
    [subFrom20(5), subFrom20(10)].join(","),
    "15,10",
  );
}

// Run all tests
function runAllTests() {
  console.log("Running Challenge 1 Tests:");
  testCreateFunction();

  console.log("\nRunning Challenge 2 Tests:");
  testCreateFunctionPrinter();

  console.log("\nRunning Challenge 3 Tests:");
  testOuter();
  testAddByX();

  console.log("\nRunning Challenge 4 Tests:");
  testOnce();

  console.log("\nRunning Challenge 5 Tests:");
  testAfter();

  console.log("\nRunning Challenge 6 Tests:");
  testDelay();

  console.log("\nRunning Challenge 7 Tests:");
  testRollCall();

  console.log("\nRunning Challenge 8 Tests:");
  testSaveOutput();

  console.log("\nRunning Challenge 9 Tests:");
  testCycleIterator();

  console.log("\nRunning Challenge 10 Tests:");
  testDefineFirstArg();
}

// Uncomment to run all tests
runAllTests();
