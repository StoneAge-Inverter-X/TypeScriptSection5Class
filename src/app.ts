//8.2 what is decorator
function Logger(constructor: Function) {
  console.log("this is decorator");
  console.log(constructor);
}

@Logger
class Persons {
  name = "sean";
  constructor() {
    console.log("this is constructing the Person object");
  }
}
const pers = new Persons();
console.log(pers);

//8.3 work wit decorater factory

function Loggers(logString: string) {
  ///returns a function that is the same as the above decorater, so that it can recieve parameters
  console.log("this is executed firstly ");
  return function (constructor: Function) {
    console.log("this is Logger decorator ..." + logString);
    console.log(constructor);
  };
}

@Loggers("today we use factorie decorater") //decorater that can receive parameter
class Personal {
  name = "Jo";
  constructor() {
    console.log("this is constructing the Person object");
  }
}
const perss = new Personal();
console.log(perss);

//lesson 8.4 buiding more useful decorators

function WithTemplate(templateHTML: string, hookID: string) {
  console.log("this executes secondly");
  return function (constructor: any) {
    //or return function (_: function) to indicate you know there is a function as argument, but you don't wanna use it
    console.log("this is WithTemplate decorator");
    const hookEl = document.getElementById(hookID);
    const p = new constructor(); // you can even call the constructor to get the object before an object is instancified.
    if (hookEl) {
      const newTemplate =
        templateHTML.slice(0, 7) + p.name + templateHTML.slice(7, -1);
      hookEl.innerHTML = newTemplate;
    }
  };
}

////multiple decorators can be applied. and the function they return are executed from bottom to top
@Loggers("today we use 2 factorie decoraters") //console.log('this is executed firstly ');-this execute firstly
@WithTemplate("<h1>My first useful decorator<h1>", "app") // console.log('this executes secondly');--this executes secondly
// the function that WithTemplate returns is executed thirdly
//  the fucntion that Loggers returns is excuted fourthly
class Personals {
  name = "Eve";
  constructor() {
    console.log("this is constructing the Personals object");
  }
}
const persss = new Personals();
console.log(persss);

// 8.6 diving into propery decorator
// property decorator, has 2 arguements
function Log(target: any, propertyName: string | symbol) {
  console.log("below is property decorator!");
  console.log(target, propertyName);
}

// accessor decorator, has 3 arguements
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("below is accesor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

// method decorator, has 3 arguements
function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log("below is method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//parameter decorator, has 3 arguments;

function Log4(target: any, name: string | symbol, position: number) {
  console.log("below is parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log ////////this is property decorator. you can check the result is : 'target' is the prototype of the Product class. because it is not instantiated, there is only prototype existing. 'propertyName' is 'title'.
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("the price should be positive");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

//lessson 8.11 an autobind (this ) decorator

function AutoBindThis(_: any, _2: any, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

class Printer {
  message = "this is clicked";
  @AutoBindThis
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const buttonClickme = document.querySelector("button")!;
///buttonClickme.addEventListener("click", p.showMessage); // this will not work, because 'this'is referred to "addEventLIstener()"
///buttonClickme.addEventListener("click", p.showMessage.bind(p)); // this will work, because 'this' is bind to object p.

////below is more advanced, using decorater to autobind this to object. Check AutoBindThis for details
buttonClickme.addEventListener("click", p.showMessage);

//8.12 validation data by using decorators
//please check the video for more details.
// function Required() {}
// function PositiveNumber() {}

class Course {
  // @Required
  title: string;
  // @PositiveNumber
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const couseForm = document.getElementById("courseForm")!; // the exlamation mark means: I am sure it exists
couseForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value; // the pluse make the string to number type

  // we could add validation in here:
  /////if (title.length>0 & price>0 & price<100000 ){
  ////   const createdCourse = new Course(title, price);
  // }

  //we could also do the validation by using decorator
  const createdCourse = new Course(title, price);
  console.log(createdCourse);
});
