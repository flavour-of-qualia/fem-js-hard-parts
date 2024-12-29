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

/*
Challenge 11: Function Output Timestamping
Create a function 'dateStamp' that accepts a function and returns a new function.
The returned function should work exactly like the input function,
but its output should be wrapped in an object with two keys:
- date: contains a timestamp of when the function was called
- output: contains the original function's output
*/
function dateStamp(func) {
  return (...args) => {
    return {
      date: Date.now(),
      output: func(...args),
    };
  };
}

// Tests for Challenge 11
function testDateStamp() {
  const stamped = dateStamp((n) => n * 2);
  const result = stamped(4);

  checkTest(
    "returns object with date and output",
    typeof result === "object" && "date" in result && "output" in result,
    true,
  );

  checkTest("output contains correct calculation", result.output, 8);

  checkTest(
    "date is valid timestamp",
    !isNaN(new Date(result.date).getTime()),
    true,
  );
}

/*
Challenge 12: String Censor
Create a function 'censor' that manages a list of string pairs for censoring.
Returns a function that either:
1. Accepts two strings to add a censorship pair
2. Accepts one string and returns it with all stored censorship applied
*/
function censor() {
  const memo = {};
  return (...args) => {
    if (args.length == 2) {
      memo[args[0]] = args[1];
    } else if (args.length == 1) {
      const string = args[0];
      const wordsToReplce = Object.keys(memo);

      return wordsToReplce.reduce((res, word) => {
        return res.replaceAll(word, memo[word]);
      }, string);
    } else return;
  };
}

// Tests for Challenge 12
function testCensor() {
  const changeScene = censor();
  changeScene("dogs", "cats");
  changeScene("quick", "slow");

  checkTest(
    "applies multiple censors",
    changeScene("The quick, brown fox jumps over the lazy dogs."),
    "The slow, brown fox jumps over the lazy cats.",
  );

  changeScene("brown", "blue");
  checkTest(
    "can add more censors",
    changeScene("The quick, brown fox jumps over the lazy dogs."),
    "The slow, blue fox jumps over the lazy cats.",
  );
}

/*
Challenge 13: Private Counter Object
Create a function 'createSecretHolder' that accepts a secret value.
Returns an object with only two methods:
1. getSecret() - returns the secret value
2. setSecret() - sets a new secret value
The secret value should not be accessible except through these methods.
*/
function createSecretHolder(secret) {
  return {
    getSecret: () => {
      return secret;
    },
    setSecret: (newSecret) => {
      secret = newSecret;
    },
  };
}

// Tests for Challenge 13
function testSecretHolder() {
  const obj = createSecretHolder(5);

  checkTest("initial secret value", obj.getSecret(), 5);

  obj.setSecret(2);
  checkTest("secret value after setting", obj.getSecret(), 2);

  checkTest("secret is private", obj.secret === undefined, true);
}

/*
Challenge 14: Call Counter
Create a function 'callTimes' that returns a new function.
The returned function should return a number representing
how many times it has been called.
*/
function callTimes() {
  let count = 0;
  return () => ++count;
}

// Tests for Challenge 14
function testCallTimes() {
  const func1 = callTimes();
  const func2 = callTimes();

  checkTest(
    "first function counts correctly",
    [func1(), func1(), func1()].join(","),
    "1,2,3",
  );

  checkTest(
    "second function has separate count",
    [func2(), func2()].join(","),
    "1,2",
  );
}

/*
Challenge 15: Roulette Game
Create a function 'roulette' that accepts a number n.
Returns a function that when called:
1. Returns 'spin' for first n-1 calls
2. Returns 'win' on the nth call
3. Returns 'game over' for all subsequent calls
*/
function roulette(n) {
  let calls = 0;
  return () => {
    calls++;
    if (n > calls) {
      return "spin";
    } else if (n === calls) {
      return "win";
    }

    return "game over";
  };
}

// Tests for Challenge 15
function testRoulette() {
  const play = roulette(3);

  checkTest("initial spins", [play(), play()].join(","), "spin,spin");

  checkTest("winning spin", play(), "win");

  checkTest(
    "game over after win",
    [play(), play()].join(","),
    "game over,game over",
  );
}

/*
Challenge 16: Running Average Calculator
Create a function 'average' that returns a function.
The returned function should:
1. Accept a number or no arguments
2. Return the current average of all numbers passed in
3. Return 0 if no numbers have been passed in
*/
function average() {
  let count = 0;
  let sum = 0;
  function getAverage() {
    return sum / count;
  }

  return (num) => {
    if (num === undefined) {
      return 0;
    } else if (typeof num !== "number" || !Number.isFinite(num)) {
      return "Not a number";
    }
    count++;
    sum += num;
    return getAverage();
  };
}

// Tests for Challenge 16
function testAverage() {
  const avg = average();

  checkTest("initial average is 0", avg(), 0);

  checkTest("single number average", avg(4), 4);

  checkTest("multiple numbers average", [avg(8), avg()].join(","), "6,0");
}

/*
Challenge 17: Function Behavior Tester
Create a function 'makeFuncTester' that accepts an array of test cases.
Each test case is a two-element array: [input, expected output].
Returns a function that tests if a callback function behaves correctly
for all test cases.
*/
function makeFuncTester(arrOfTests) {
  let i = 0;
  return (cb) => {
    return cb(arrOfTests[i][0]) === arrOfTests[i][1];
  };
}

// Tests for Challenge 17
function testMakeFuncTester() {
  const tests = [
    ["hello", "HELLO"],
    ["goodbye", "GOODBYE"],
  ];
  const tester = makeFuncTester(tests);

  checkTest(
    "correctly identifies matching function",
    tester((str) => str.toUpperCase()),
    true,
  );

  checkTest(
    "correctly identifies non-matching function",
    tester((str) => str + "!"),
    false,
  );
}

/*
Challenge 18: Command History
Create a function 'makeHistory' that accepts a number (limit).
Returns a function that stores command history up to the limit.
The returned function should:
1. Accept a string command or 'undo'
2. Return '[command] done' or '[command] undone'
3. Return 'nothing to undo' if history is empty
*/
function makeHistory(limit) {
  const history = [];
  return (input) => {
    if (input === "undo") {
      if (history.length === 0) return "nothing to undo";

      return `${history.pop()} undone`;
    }

    history.push(input);
    return `${input} done`;
  };
}

// Tests for Challenge 18
function testMakeHistory() {
  let history = makeHistory(2);

  checkTest(
    "executes commands",
    [history("jump"), history("walk")].join(","),
    "jump done,walk done",
  );

  checkTest("handles undo", history("undo"), "walk undone");

  history = makeHistory(2);

  checkTest(
    "respects history limit",
    [
      history("look"),
      history("run"),
      history("undo"),
      history("undo"),
      history("undo"),
    ].join(","),
    "look done,run done,run undone,look undone,nothing to undo",
  );
}

/*
Challenge 19: Blackjack Card Game
Create a function 'blackjack' that accepts an array of numbers (1-11).
Returns a dealer function that accepts two numbers as an initial hand.
The dealer function returns a player function that:
1. Returns initial hand sum on first call
2. Returns updated hand sum or 'bust' on subsequent calls
3. Returns 'you are done!' after busting
*/
function blackjack(array) {
  return (card1, card2) => {
    let i = 0;
    let sum = 0;
    sum = card1 + card2;

    return () => {
      if (i++ == 0) return sum;
      if (sum > 21) return "you are done!";
      sum += array.shift();

      return sum > 21 ? "bust" : sum;
    };
  };
}

// Tests for Challenge 19
function testBlackjack() {
  // Test 1: Basic game flow
  const deal1 = blackjack([3, 4, 5]);
  const player1 = deal1(2, 3);
  checkTest("initial hand sum", player1(), 5);
  checkTest("after first hit", player1(), 8);
  checkTest("after second hit", player1(), 12);

  // Test 2: Game with busting
  const deal2 = blackjack([10, 5]);
  const player2 = deal2(10, 5);
  checkTest("initial hand before bust", player2(), 15);
  checkTest("should bust on hit", player2(), "bust");
  checkTest("should be done after bust", player2(), "you are done!");
  checkTest("should still be done", player2(), "you are done!");

  // Test 3: Multiple players from same deck
  const deal3 = blackjack([2, 3, 4]);
  const playerA = deal3(10, 10);
  const playerB = deal3(5, 5);
  checkTest("player A initial hand", playerA(), 20);
  checkTest("player B initial hand", playerB(), 10);
  checkTest("player B first hit", playerB(), 12);
}

/*
Challenge 20: Function Input Modification
Create a function 'pipe' that accepts an array of functions as an input.
It should return a new function that runs the input through each function in sequence,
using the output of each function as the input to the next function.
*/
function pipe(functionsArray) {
  return (input) => {
    return functionsArray.reduce((acc, func) => {
      return (acc = func(acc));
    }, input);
  };
}

// Tests for Challenge 20
function testPipe() {
  const capitalize = (str) => str.toUpperCase();
  const addExclamation = (str) => str + "!";
  const repeat = (str) => str + " " + str;

  const pipeline = pipe([capitalize, addExclamation, repeat]);

  checkTest("pipes multiple functions", pipeline("hello"), "HELLO! HELLO!");

  const pipeline2 = pipe([addExclamation, repeat]);
  checkTest(
    "works with different function combinations",
    pipeline2("hey"),
    "hey! hey!",
  );
}

/*
Challenge 21: Memoization with Timeout
Create a function 'memoizeWithTimeout' that accepts:
1. A function to memoize
2. A time in milliseconds
Returns a memoized version of the function that clears its cache after the specified time.
*/
function memoizeWithTimeout(func, timeout) {
  let cache = {};
  return (input) => {
    if (cache[input]) return cache[input];

    cache[input] = func(input);
    setTimeout(() => {
      cache[input] = undefined;
    }, timeout);

    return cache[input];
  };
}

// Tests for Challenge 21
function testMemoizeWithTimeout() {
  let callCount = 0;
  const expensive = (n) => {
    callCount++;
    return n * 2;
  };

  const memoized = memoizeWithTimeout(expensive, 1000);

  checkTest("initial function call works", memoized(5), 10);

  checkTest("uses cached value", [memoized(5), callCount].join(","), "10,1");

  // Wait for cache to clear
  setTimeout(() => {
    checkTest(
      "cache cleared after timeout",
      [memoized(5), callCount].join(","),
      "10,2",
    );
  }, 1500);
}

/*
Challenge 22: Debounce Function
Create a function 'debounce' that accepts:
1. A function to debounce
2. A delay in milliseconds
Returns a function that will only execute after the specified delay
has passed since its last invocation.
*/
function debounce(func, delay) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

// Tests for Challenge 22
function testDebounce() {
  let counter = 0;
  const increment = () => counter++;
  const debouncedIncrement = debounce(increment, 100);

  debouncedIncrement();
  debouncedIncrement();
  debouncedIncrement();

  checkTest("function not called immediately", counter, 0);

  setTimeout(() => {
    checkTest("function called once after delay", counter, 1);
  }, 200);
}

/*
Challenge 23: Throttle Function
Create a function 'throttle' that accepts:
1. A function to throttle
2. A time interval in milliseconds
Returns a function that can only be executed once within the specified interval.
Additional calls within the interval are ignored.
*/
function throttle(func, interval) {
  let timer = null;
  let lastCall = null;

  return (...args) => {
    if (timer) {
      lastCall = args;
      return;
    }
    func(...args);
    timer = setTimeout(() => {
      if (lastCall !== null) {
        func(...lastCall);
        lastCall = null;
      }
      timer = null;
    }, interval);
  };
}

// Tests for Challenge 23
function testThrottle() {
  let lastValue = null;
  const updateValue = (val) => {
    lastValue = val;
  };
  const throttledUpdate = throttle(updateValue, 100);

  // Test immediate execution
  throttledUpdate("A");
  checkTest("first call executes immediately", lastValue, "A");

  // Test throttling and storing last call
  throttledUpdate("B");
  throttledUpdate("C");
  checkTest("ignores intermediate calls", lastValue, "A");

  // Test execution of last ignored call
  setTimeout(() => {
    checkTest("executes last ignored call after interval", lastValue, "C");

    // Test new call after interval
    throttledUpdate("D");
    checkTest("allows new execution after interval", lastValue, "D");
  }, 150);
}

/*
Challenge 24: Function Currying
Create a function 'curry' that accepts a function and returns a curried version
of that function. The curried function should accept arguments one at a time
until it has enough arguments to execute the original function.
*/
function curry(func) {}

// Tests for Challenge 24
function testCurry() {
  const add3 = (a, b, c) => a + b + c;
  const curriedAdd = curry(add3);

  checkTest("curried function works", curriedAdd(1)(2)(3), 6);

  const addOne = curriedAdd(1);
  const addOneTwo = addOne(2);

  checkTest(
    "partial application works",
    [addOne(2)(3), addOneTwo(3)].join(","),
    "6,6",
  );
}

/*
Challenge 25: Middleware Chain
Create a function 'applyMiddleware' that accepts an array of middleware functions
and returns a function that executes them in sequence, where each middleware
can modify or halt the execution chain.
*/
function applyMiddleware(middlewares) {}

// Tests for Challenge 25
function testApplyMiddleware() {
  const addExclamation = (next) => (str) => next(str + "!");
  const addQuestion = (next) => (str) => next(str + "?");
  const addSpace = (next) => (str) => next(str + " ");

  const chain = applyMiddleware([addExclamation, addQuestion, addSpace]);

  checkTest("applies middleware chain", chain("hello"), "hello!? ");

  const reverseChain = applyMiddleware([addSpace, addQuestion, addExclamation]);

  checkTest("order matters in middleware", reverseChain("hello"), "hello !?!");
}

// Complete runAllTests function with all challenges
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

  console.log("\nRunning Challenge 11 Tests:");
  testDateStamp();

  console.log("\nRunning Challenge 12 Tests:");
  testCensor();

  console.log("\nRunning Challenge 13 Tests:");
  testSecretHolder();

  console.log("\nRunning Challenge 14 Tests:");
  testCallTimes();

  console.log("\nRunning Challenge 15 Tests:");
  testRoulette();

  console.log("\nRunning Challenge 16 Tests:");
  testAverage();

  console.log("\nRunning Challenge 17 Tests:");
  testMakeFuncTester();

  console.log("\nRunning Challenge 18 Tests:");
  testMakeHistory();

  console.log("\nRunning Challenge 19 Tests:");
  testBlackjack();

  console.log("\nRunning Challenge 20 Tests:");
  testPipe();

  console.log("\nRunning Challenge 21 Tests:");
  testMemoizeWithTimeout();

  console.log("\nRunning Challenge 22 Tests:");
  testDebounce();

  console.log("\nRunning Challenge 23 Tests:");
  testThrottle();

  // console.log('\nRunning Challenge 24 Tests:');
  // testCurry();

  // console.log('\nRunning Challenge 25 Tests:');
  // testApplyMiddleware();
}

// Helper functions for timing-based tests
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTimingTests() {
  console.log("Running timing-based tests...");
  await wait(0);
  testDebounce();
  await wait(300);
  testThrottle();
  await wait(300);
  testMemoizeWithTimeout();
  console.log("Timing tests complete!");
}

// Uncomment to run all tests
runAllTests();

// runTimingTests();
