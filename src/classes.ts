class Department {
  static estYear = 1922;
  //public is default
  //   private readonly id :string
  //   public name: string;
  protected employee: string[] = [];

  //static method
  static createEmployee(name: string) {
    return { name: name };
  }

  //shorthand of define and initialize property
  constructor(public readonly id: string, private name: string) {
    // this.id = id;
    // this.name = n;
  }

  //to clear "this" confusion: TS checks the one who is calling, if it has the same structure as Departemnt
  describer(this: Department) {
    console.log(`the ${this.id} department of: ${this.name}: good condition `);
  }

  addEmployee(employee: string) {
    this.employee.push(employee);
  }

  printEmployeeInfor() {
    console.log(this.employee.length);
    console.log(this.employee);
  }
}

//inherant class
class ITDepartment extends Department {
  admins: string[];
  private salary: number;
  constructor(id: string, admins: string[], salary: number) {
    super(id, "IT");
    // "this " keyword should only been used afer super() is called
    this.admins = admins;
    this.salary = salary;
  }
  // getter function allows readonly to private property
  get gimmeSalary() {
    if (this.salary) {
      return this.salary;
    }
    throw new Error("there is no salary defined");
  }

  //setter funtion allows to change the private property
  set setSalary(value: number) {
    if (value > 0) {
      this.salary = value;
    } else {
      throw new Error("the value must be greater than 0");
    }
  }

  printEmployeeInfor() {
    console.log("the admins(also employees :) " + this.admins);
  }

  addEmployee() {
    this.employee = [...this.admins];
    console.log(this.employee);
  }
}

const act = new Department("23", "accounting");
act.describer();

// //to clear "this" confusion
// const anotherAct = { name: "Dummy", describer: act.describer };
// anotherAct.describer();

act.addEmployee("Sean");
act.addEmployee("Mark");
act.printEmployeeInfor();
// // when the proper is not "private", you can do below things
// act.employee.push("Joe");
// act.printEmployeeInfor();
// act.employee[3] = "Udong";
// act.printEmployeeInfor();

//inherent classes
const ITDpt = new ITDepartment("77", ["Sean", "Mike", "Anna"], 990);
ITDpt.describer();
ITDpt.printEmployeeInfor();
console.log("-------");
ITDpt.addEmployee();
console.log(ITDpt.gimmeSalary);
//calling the setter
// ITDpt.setSalary = -1;
ITDpt.setSalary = 99990000;
//calling the getter
console.log(ITDpt.gimmeSalary);

//call a static method
const firstWorker = Department.createEmployee("Sean");
console.log(firstWorker, Department.estYear);
