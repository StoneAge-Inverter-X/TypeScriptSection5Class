//6.2 intersection types
////intersecction 2 custom types
type Admin = {
  name: string;
  privilege: string[];
};

type Empl = {
  name: string;
  startDate: Date;
};

type PromotedEmp = Admin & Empl;

const e1: PromotedEmp = {
  name: "sean",
  privilege: ["sickleave"],
  startDate: new Date(),
};
////intersection with 2 union types
type Combinded = string | number;
type Numeric = number | boolean;
type Universal = Combinded & Numeric;

const e2: Universal = 3;

//6.3type guard
type UnkownEmpl = Empl | Admin;
function printEmp(e: UnkownEmpl) {
  if ("startDate" in e) {
    console.log("this guys start date is : ", e.startDate);
  } else {
    console.log("this guy is :", e.privilege[0]);
  }
}

const e3: UnkownEmpl = { name: "Sean", privilege: ["able to fly"] };
printEmp(e3);
const e4: UnkownEmpl = { name: "Sean", startDate: new Date() };
printEmp(e4);

////more type guards

class Car {
  drive() {
    console.log("i am driving");
  }
  passengers(people: number) {
    console.log(" i am have these people on board", people);
  }
}

class Truck {
  drive() {
    console.log("i am driving");
  }

  load(amount: number) {
    console.log("i am loading", amount);
  }

  unloading(amount: number) {
    console.log("now , i am loading", amount);
  }
}

type Vehecal = Car | Truck;

function useVehecal(v: Vehecal) {
  if (v instanceof Truck) {
    v.load(100);
  }
}

const v1: Vehecal = new Truck();
useVehecal(v1);

//6.4 discriminated type
interface Bird {
  type: "bird";
  flySpeed: number;
}

interface Horse {
  type: "horse";
  runSpeed: number;
}

type Animal = Bird | Horse;

function showSpeed(animal: Animal) {
  let speed: number;
  switch (animal.type) {
    case "bird":
      speed = animal.flySpeed;
      break;
    case "horse":
      speed = animal.runSpeed;
  }
  console.log("moving speed is :", speed);
}

//6.5 type casting: tels TS what type of value it is going to get. like forecasting
//// 2 ways, this is way 1
// const userInputElement = <HTMLInputElement>document.getElementById('user-input');

/////way 2 : in react js
const userInputElement = document.getElementById(
  "user-input"
) as HTMLInputElement;
userInputElement.value = "heelloo htere  !";

//6.7 funciotn overload

type Combinable = number | string;

function addTwoThings(a: number, b: number): number; // this is fucntion overload
function addTwoThings(a: string, b: string): string; // this is fucntion overload

function addTwoThings(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const theResult = addTwoThings("sf", "sfd");
theResult.split(" "); // 'cause the overload, so that you can use split() funciton in here

//6.8optional chaining
const fetchedData = {
  name: "sean",
  age: "28",
  job: {
    title: "ceo",
    salary: "1000000",
  },
};
if (fetchedData?.job?.title) {
  console.log("yes!");
}

// 6.9 nullish coalescing
// const userInput = undefined;
const userInput = undefined;

// const userInput = "beauty";

const storeData = userInput ?? "defaultValue";
console.log(storeData);
