//7.1 buit in generics and what is generics
const names: Array<string> = ["sean", "ceo of future"]; // array with string as elements
///names[0].split(' ');
/// const names: Array<string| number>= ['sean','ceo of future',38]

////Promist and string -> to be a generics
const aPromis: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("this is done!");
  }, 2000);
  if (false) reject("not good");
}); //// A promise yelds a string as resolve
aPromis.then((data) => {
  const datas = data.split(" ");
  console.log(datas);
}); //// So TS knows the data is a string, so that the split() is callable.

//lessson 7.3 creating a generic fucntion and type constrain
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
} //// the <T extends object, U extends object> tells TS the returned value is intersection of type T and type U

const mergedObj = merge({ name: "sean" }, { age: 20 });
console.log(mergedObj.age);

// lesson 7.5 another generic fucntion

interface Lengthy {
  length: number;
}
// because string and array has length property,so the T can have them as type
function countAndDesc<T extends Lengthy>(element: T): [T, string] {
  let desc = "no value";
  if (element.length === 1) {
    desc = " got 1 element";
  } else if (element.length > 1) {
    desc = " got " + element.length + " element";
  }
  return [element, desc];
}
console.log(countAndDesc("hello, i am me"));

//7.6 the keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "value is " + obj[key];
}
console.log(extractAndConvert({ name: "sean" }, "name"));
