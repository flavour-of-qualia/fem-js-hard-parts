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

// Helper function for async tests
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*
Challenge 1: Event Loop Understanding
Create two functions that demonstrate the event loop behavior:
- sayHowdy: logs 'Howdy'
- testMe: sets up setTimeout for sayHowdy and logs 'Partnah'
This tests understanding of JavaScript's event loop and execution order.
*/
function sayHowdy() {
  console.log("Howdy");
  return "Howdy"; // For testing purposes
}

function testMe() {
  const outputs = [];
  setTimeout(() => {
    outputs.push(sayHowdy());
  }, 0);
  outputs.push("Partnah");
  return outputs;
}

async function testEventLoop() {
  console.log("Testing event loop behavior...");
  const result = testMe();
  await wait(100); // Wait for setTimeout
  checkTest("Event loop order", result.join(", "), "Partnah, Howdy");
}

/*
Challenge 2: Delayed Greeting
Create a function that logs a welcome message after 3 seconds.
Tests timing of setTimeout and basic async behavior.
*/
function delayedGreet(fn) {
  setTimeout(() => {
    fn();
    console.log("howdy");
  }, 3000);
}

async function testDelayedGreet() {
  console.log("Testing delayed greeting...");
  let called = false;
  const start = Date.now();

  delayedGreet(() => {
    called = true;
  });

  await wait(2900);
  checkTest("Should not call before 3 seconds", called, false);

  await wait(200);
  checkTest("Should call after 3 seconds", called, true);
}

/*
Challenge 3: Multiple Timers
Create a function that demonstrates handling multiple timeouts:
- Logs 'hello' immediately
- Logs 'good bye' after 2 seconds
*/
function helloGoodbye(log) {
  log("hello");
  setTimeout(() => log("good bye"), 2000);
}

async function testHelloGoodbye() {
  console.log("Testing hello goodbye...");
  const outputs = [];

  helloGoodbye((msg) => outputs.push(msg));

  await wait(100);
  checkTest("Should log hello immediately", outputs[0], "hello");

  await wait(2000);
  checkTest("Should log goodbye after delay", outputs[1], "good bye");
}

/*
Challenge 4: Recurring Timer
Create a function that logs a message every second indefinitely.
Tests setInterval functionality.
*/
function brokenRecord(fn) {
  let timer_id = setInterval(() => {
    fn("hi again");
  }, 1000);
  return () => {
    console.log("stopped");
    clearInterval(timer_id);
  };
}

async function testBrokenRecord() {
  console.log("Testing broken record...");
  const outputs = [];
  const stopRecord = brokenRecord((msg) => outputs.push(msg));

  await wait(3100); // Wait for 3 iterations
  stopRecord(); // Stop the interval
  console.log(outputs);

  checkTest(
    "Should log every second",
    outputs.length >= 3 && outputs.every((msg) => msg === "hi again"),
    true,
  );
}

/*
Challenge 5: Limited Recurring Timer
Create a function that logs a message every second for 5 seconds only.
Tests combination of setInterval and setTimeout for cleanup.
*/
function limitedRepeat(fn) {
  const intervalId = setInterval(() => fn("hi for now"), 1000);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 5000);
}

async function testLimitedRepeat() {
  console.log("Testing limited repeat...");
  const outputs = [];
  limitedRepeat((msg) => outputs.push(msg));

  await wait(6100); // Wait for full duration plus buffer

  checkTest(
    "Should log exactly 5 times",
    outputs.length === 5 && outputs.every((msg) => msg === "hi for now"),
    true,
  );
}

/*
Challenge 6: Configurable Interval and Duration
Create a function that executes a callback every X seconds for Y seconds total.
Tests complex timer management with configurable intervals.
*/
function everyXsecsForYsecs(func, interval, duration) {
  const intervalId = setInterval(() => func(), interval);
  setTimeout(() => clearInterval(intervalId), duration);
}

async function testEveryXsecsForYsecs() {
  console.log("Testing configurable intervals...");
  const outputs = [];
  everyXsecsForYsecs(
    () => outputs.push("test"),
    1000, // 1 second interval
    3000, // 3 seconds duration
  );

  await wait(3100);
  checkTest("Should execute correct number of times", outputs.length, 3);
}

/*
Challenge 7: Delayed Counter
Create a function that counts up to a target number with specified delays.
Tests progressive timer management and closure concepts.
*/
function delayCounter(target, wait) {
  let count = 0;
  return (log) => {
    let interval_id;
    const addCount = () => {
      log(++count);
      if (!interval_id) return;
      clearInterval(interval_id);
    };

    setInterval(addCount, 1000);
  };
}

async function testDelayCounter() {
  console.log("Testing delay counter...");
  const outputs = [];
  const counter = delayCounter(3, 1000);
  counter((num) => outputs.push(num));

  await wait(3100);
  checkTest("Should count up to target", outputs.join(","), "1,2,3");
}

/*
Challenge 8: Promise Delayed Resolution
Create a function that returns a promise resolving after 2 seconds.
Tests basic Promise creation and timing.
*/
function promised(val) {
  let promise = new Promise((resolve) => {
    setTimeout(() => resolve(val), 2000);
  });

  return promise;
}

async function testPromised() {
  console.log("Testing promised...");
  const start = Date.now();
  const result = await promised("test");
  const duration = Date.now() - start;

  checkTest("Should resolve with correct value", result, "test");

  checkTest(
    "Should take about 2 seconds",
    duration >= 1900 && duration <= 2100,
    true,
  );
}

/*
Challenge 9: Second Clock Class
Create a class that implements a clock ticking every second.
Tests OOP concepts with timer management.
*/
class SecondClock {
  constructor(cb) {}

  start() {}

  reset() {}
}

async function testSecondClock() {
  console.log("Testing second clock...");
  const outputs = [];
  const clock = new SecondClock((val) => outputs.push(val));

  clock.start();
  await wait(3100);
  clock.reset();

  checkTest("Should tick correct number of times", outputs.join(","), "1,2,3");
}

/*
Challenge 10: Debounce Function
Create a function that prevents a callback from being called too frequently.
Tests advanced timer management and function wrapping.
*/
function debounce(callback, interval) {}

async function testDebounce() {
  console.log("Testing debounce...");
  let callCount = 0;
  const debouncedFn = debounce(() => callCount++, 2000);

  debouncedFn();
  debouncedFn();
  debouncedFn();

  await wait(1000);
  checkTest("Should not call immediately", callCount, 0);

  await wait(2000);
  checkTest("Should call once after interval", callCount, 1);
}

// Run all tests
async function runAllTests() {
  await testEventLoop();
  await testDelayedGreet();
  await testHelloGoodbye();
  await testBrokenRecord();
  await testLimitedRepeat();
  await testEveryXsecsForYsecs();
  await testDelayCounter();
  await testPromised();
  await testSecondClock();
  await testDebounce();
}

// Uncomment to run all tests
// runAllTests().then(() => console.log("All tests complete!"));

// Or run individual tests:
// testEventLoop();
// testDelayedGreet();
// testHelloGoodbye();
// testBrokenRecord();
// testLimitedRepeat();
// testEveryXsecsForYsecs();
// testDelayCounter();
// testPromised();
testSecondClock();
// testDebounce();
