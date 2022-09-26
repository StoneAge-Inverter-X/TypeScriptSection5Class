// interface is for defining  a structure of object. it can be used as type to type check

interface Greetable {
  name: string;

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
user1.greet("hillo0 ");
