// interface is for defining  a structure of object. it can be used as type to type check

interface Greetable {
  name: string;
  ////to set name as readonly property:
  // readonly name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 20;

  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    console.log(phrase + this.name);
  }
}

// Person can be used as type.
let user1: Greetable;
user1 = new Person("Sean");
user1.greet("hillo00000000 ");

//5.20 extending interface
interface Named {
  name: string;
}

interface GreetPerson extends Named {
  greet(phrase: string): void;
}

class ToGreetPerson implements GreetPerson {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet(phrase: string) {
    console.log("hello " + this.name + " " + phrase);
  }
}

let aPerson: ToGreetPerson;
aPerson = new ToGreetPerson("Kong");
aPerson.greet("goog morning");

//lesson 5.21 interface as funciton type
//first ,review what is funciton type:
type AddFn = (a: number, b: number) => number;
let add: AddFn;
add = (n1: number, n2: number) => {
  return n1 + n2;
};

//let's do interface as function type
interface AddTwo {
  (a: number, b: number): number;
}

let addFunc: AddTwo;
addFunc = (n1: number, n2: number) => {
  return n1 + n2;
};

/////lesson 5.21 optional propety and optional parameter:

interface Dog {
  name: string;
  nickName?: string; //?stands for optional
  greet?(phrase: string): void;
}

class Qiwawa implements Dog {
  name: string;
  nickName?: string; //in class Qiwawa nickname is optional

  constructor(n: string, nick?: string) {
    //nick parmeter is optional , if not exist, nick will = undifined
    this.name = n;
    if (nick) {
      this.nickName = nick;
    }
  }
  greet(phrase: string) {
    console.log("hello " + this.name + " " + phrase);
    if (this.nickName) {
      console.log("your name is also " + " " + this.nickName);
    }
  }
}

let dog1: Qiwawa;
dog1 = new Qiwawa("qiqi");
dog1.greet("good morning");

let dog2: Qiwawa;
dog2 = new Qiwawa("jiji", "baba");
dog2.greet("all the best to you");
