/****************************************************************
                      TEST HELPER FUNCTION
****************************************************************/

function checkTest(testName, actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`✅ ${testName} PASSED`);
  } else {
    console.log(`❌ ${testName} FAILED`);
    console.log(`   Expected: ${JSON.stringify(expected)}`);
    console.log(`   Got: ${JSON.stringify(actual)}`);
  }
}

/****************************************************************
                  WORKING WITH OBJECT LITERALS
****************************************************************/

/* CHALLENGE 1
Create a function makePerson that takes two arguments, name and age.
This function should return an object with properties:
- name: value passed into the function
- age: value passed into the function

Example:
const vicky = makePerson('Vicky', 24);
// vicky -> { name: 'Vicky', age: 24 }
*/

function makePerson(name, age) {
  return {
    name: name,
    age: age,
  };
}

function testMakePerson() {
  const vicky = makePerson("Vicky", 24);

  checkTest("person has correct name", vicky.name, "Vicky");

  checkTest("person has correct age", vicky.age, 24);

  checkTest(
    "person object has only name and age properties",
    Object.keys(vicky).sort().join(","),
    "age,name",
  );
}

/****************************************************************
                       USING OBJECT.CREATE
****************************************************************/

/* CHALLENGE 2
Inside personStore object, create a property greet where the value
is a function that logs "hello". This will be shared by all objects
created from personStore.

Example:
personStore.greet(); // logs 'hello'
*/

const personStore = {
  greet: function () {
    console.log("hello");
  },
};

function testPersonStore() {
  let greeting = "";
  const log = console.log;
  console.log = (msg) => (greeting = msg);

  personStore.greet();
  console.log = log;

  checkTest("personStore greet method logs hello", greeting, "hello");
}

/* CHALLENGE 3
Create a function personFromPersonStore that takes two arguments,
name and age. Using Object.create, create and return a new object
with a prototype of personStore and properties:
- name: value passed into the function
- age: value passed into the function

Example:
const sandra = personFromPersonStore('Sandra', 26);
// sandra -> { name: 'Sandra', age: 26 }
// sandra.greet() -> logs 'hello'
*/

function personFromPersonStore(name, age) {
  const person = Object.create(personStore);
  person.name = name;
  person.age = age;
  return person;
}

function testPersonFromPersonStore() {
  const sandra = personFromPersonStore("Sandra", 26);
  let greeting = "";
  const log = console.log;
  console.log = (msg) => (greeting = msg);

  sandra.greet();
  console.log = log;

  checkTest("created person has correct name", sandra.name, "Sandra");

  checkTest("created person has correct age", sandra.age, 26);

  checkTest("created person inherits greet method", greeting, "hello");

  checkTest(
    "created person uses personStore as prototype",
    Object.getPrototypeOf(sandra) === personStore,
    true,
  );
}

/* CHALLENGE 4
Add a method introduce to the personStore object that logs
"Hi, my name is [name]". This will be shared by all objects
created from personStore.

Example:
const sandra = personFromPersonStore('Sandra', 26);
sandra.introduce(); // logs 'Hi, my name is Sandra'
*/

personStore.introduce = function () {
  console.log(`Hi, my name is ${this.name}`);
};

function testIntroduce() {
  const sandra = personFromPersonStore("Sandra", 26);
  let introduction = "";
  const log = console.log;
  console.log = (msg) => (introduction = msg);

  sandra.introduce();
  console.log = log;

  checkTest(
    "introduce method works correctly",
    introduction,
    "Hi, my name is Sandra",
  );
}

/****************************************************************
                    USING THE 'NEW' KEYWORD
****************************************************************/

/* CHALLENGE 5
Create a function PersonConstructor that adds a method greet to its
prototype. greet should log 'hello'. This will be shared by all
objects created with the 'new' keyword from PersonConstructor.

Example:
const simon = new PersonConstructor();
simon.greet(); // logs 'hello'
*/

function PersonConstructor() {}

PersonConstructor.prototype.greet = function () {
  console.log("hello");
};

function testPersonConstructor() {
  const simon = new PersonConstructor();
  let greeting = "";
  const log = console.log;
  console.log = (msg) => (greeting = msg);

  simon.greet();
  console.log = log;

  checkTest(
    "constructor creates object with working greet method",
    greeting,
    "hello",
  );
}

/* CHALLENGE 6
Create a function personFromConstructor that takes two arguments,
name and age. This function should return a new object created with
the 'new' keyword from PersonConstructor with properties:
- name: value passed into the function
- age: value passed into the function

Example:
const mike = personFromConstructor('Mike', 30);
// mike -> { name: 'Mike', age: 30 }
// mike.greet() -> logs 'hello'
*/

function personFromConstructor(name, age) {
  const person = new PersonConstructor();
  person.name = name;
  person.age = age;
  return person;
}

function testPersonFromConstructor() {
  const mike = personFromConstructor("Mike", 30);
  let greeting = "";
  const log = console.log;
  console.log = (msg) => (greeting = msg);

  mike.greet();
  console.log = log;

  checkTest("constructed person has correct name", mike.name, "Mike");

  checkTest("constructed person has correct age", mike.age, 30);

  checkTest("constructed person inherits greet method", greeting, "hello");
}

/* CHALLENGE 7
Add a method introduce to the PersonConstructor prototype that logs
"Hi, my name is [name]". This will be shared by all objects created
from personFromConstructor.

Example:
const mike = personFromConstructor('Mike', 30);
mike.introduce(); // logs 'Hi, my name is Mike'
*/

PersonConstructor.prototype.introduce = function () {
  console.log(`Hi, my name is ${this.name}`);
};

function testConstructorIntroduce() {
  const mike = personFromConstructor("Mike", 30);
  let introduction = "";
  const log = console.log;
  console.log = (msg) => (introduction = msg);

  mike.introduce();
  console.log = log;

  checkTest(
    "introduce method works on constructed objects",
    introduction,
    "Hi, my name is Mike",
  );
}

/****************************************************************
                        USING ES6 CLASSES
****************************************************************/

/* CHALLENGE 8
Create an ES6 class PersonClass with:
- A constructor that takes a name argument and sets it as a property
- A method greet that logs 'hello'

Example:
const george = new PersonClass('George');
george.greet(); // logs 'hello'
*/

class PersonClass {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log("hello");
  }
}

function testPersonClass() {
  const george = new PersonClass("George");
  let greeting = "";
  const log = console.log;
  console.log = (msg) => (greeting = msg);

  george.greet();
  console.log = log;

  checkTest("class instance has correct name", george.name, "George");

  checkTest("class greet method works", greeting, "hello");
}

/* CHALLENGE 9
Create an ES6 class DeveloperClass that:
1. Extends PersonClass
2. Has a constructor that takes name and age arguments
3. Has an introduce method that logs 'Hello World, my name is [name]'

Example:
const thai = new DeveloperClass('Thai', 32);
thai.introduce(); // logs 'Hello World, my name is Thai'
*/

class DeveloperClass extends PersonClass {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  introduce() {
    console.log(`Hello World, my name is ${this.name}`);
  }
}

function testDeveloperClass() {
  const thai = new DeveloperClass("Thai", 32);
  let introduction = "";
  const log = console.log;
  console.log = (msg) => (introduction = msg);

  thai.introduce();
  console.log = log;

  checkTest("developer has correct name", thai.name, "Thai");

  checkTest(
    "developer introduce method works",
    introduction,
    "Hello World, my name is Thai",
  );
}

/****************************************************************
                      EXTENSION: SUBCLASSING
****************************************************************/

const userFunctionStore = {
  sayType: function () {
    console.log("I am a " + this.type);
  },
};

function userFactory(name, score) {
  let user = Object.create(userFunctionStore);
  user.type = "User";
  user.name = name;
  user.score = score;
  return user;
}

/* CHALLENGE 10
Create an object adminFunctionStore that inherits from userFunctionStore
using Object.create. This gives admins access to userFunctionStore methods.
*/

const adminFunctionStore = Object.create(userFunctionStore);

/* CHALLENGE 11-13
Create an adminFactory function that:
1. Takes name and score parameters
2. Creates an admin object inheriting from adminFunctionStore
3. Sets type to "Admin" instead of "User"
4. Returns the admin object
*/

function adminFactory(name, score) {
  const admin = Object.create(adminFunctionStore);
  admin.name = name;
  admin.score = score;
  admin.type = "Admin";
  return admin;
}

/* CHALLENGE 14
Add a sharePublicMessage method to adminFunctionStore that logs
'Welcome users!'. This should be available to admin objects but
not user objects.
*/

adminFunctionStore.sharePublicMessage = function () {
  console.log("Welcome users!");
};

function testAdmin() {
  const adminFromFactory = adminFactory("Eva", 5);
  let output = [];
  const log = console.log;
  console.log = (msg) => output.push(msg);

  adminFromFactory.sayType();
  adminFromFactory.sharePublicMessage();
  console.log = log;

  checkTest("admin has correct type", output[0], "I am a Admin");

  checkTest("admin can share public message", output[1], "Welcome users!");
}

/****************************************************************
                      EXTENSION: MIXINS
****************************************************************/

/*
Create a way to mix Robot properties into a Dog instance.
The mixed robot-dog should use the robot's speak method
instead of the dog's, but should maintain its own properties.
*/

class Dog {
  constructor() {
    this.legs = 4;
  }
  speak() {
    console.log("Woof!");
  }
}

const robotMixin = {
  skin: "metal",
  speak: function () {
    console.log(`I have ${this.legs} legs and am made of ${this.skin}`);
  },
};

function testRobotDog() {
  let robotFido = new Dog();
  Object.assign(robotFido, robotMixin);

  let output = "";
  const log = console.log;
  console.log = (msg) => (output = msg);

  robotFido.speak();
  console.log = log;

  checkTest(
    "robot dog has correct speech",
    output,
    "I have 4 legs and am made of metal",
  );
}

/****************************************************************
                           RUN TESTS
****************************************************************/

function runAllTests() {
  console.log("Running Challenge 1 Tests:");
  testMakePerson();

  console.log("\nRunning Challenge 2 Tests:");
  testPersonStore();

  console.log("\nRunning Challenge 3 Tests:");
  testPersonFromPersonStore();

  console.log("\nRunning Challenge 4 Tests:");
  testIntroduce();

  console.log("\nRunning Challenge 5 Tests:");
  testPersonConstructor();

  console.log("\nRunning Challenge 6 Tests:");
  testPersonFromConstructor();

  console.log("\nRunning Challenge 7 Tests:");
  testConstructorIntroduce();

  console.log("\nRunning Challenge 8 Tests:");
  testPersonClass();

  console.log("\nRunning Challenge 9 Tests:");
  testDeveloperClass();

  console.log("\nRunning Admin Tests:");
  testAdmin();

  console.log("\nRunning Mixin Tests:");
  testRobotDog();
}

// Uncomment the following line to run all tests
// runAllTests();

// Or run individual tests:
// testMakePerson();
// testPersonStore();
// etc.
