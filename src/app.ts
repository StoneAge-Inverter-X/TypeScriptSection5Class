class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describer(header: string) {
    console.log(header + this.name);
  }
}

const act = new Department("accounting");

act.describer("this is department of:   ");
