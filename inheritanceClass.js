'use strict';
class Personcl1s {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }

  calcage() {
    console.log('age is >>>>>>>', 2023 - this.year);
  }
  get getcalcage() {
    return 2023 - this.year;
  }

  // /**
  //  * @param {string | string[]} name
  //  */
  set name(name) {
    console.log('set name>>>>>>>>', name);
    if (name.includes(' ')) this._name = name;
    else alert(`${name} is not full name!`);
  }

  // get name() {
  //   return this._name;
  // }

  static hey() {
    console.log('hey there>>>>>>>>>>😀');
    console.log('static method used in the person class>>>', this);
  }
}
//class hide a lot of scene behind as the class are the layer of abstraction over the constructor function.So in es6 we inherit the property and methods fom parent by extend keyword
//extends--> key word links the prototype behind the secenes withoout having to think about that
//super--> is the constructor function of the parent class and it implements the constructor function of the parent class and we dont need to implement it manually like the parent.call(this,name,year)
//so without super we cant get the parent property and method because this acts like a new key word and along with the call fn it creates the empty obj and in that obj we pass the value by ref and that ref value is denoted by the "this" in the parent func.
class Student1 extends Personcl1s {
  constructor(name, year, dep) {
    //always need to happen first because this call to the super function is responsible for creating the "this" keyword in the sub class

    super(name, year); //abstraction
    this.dep = dep; //inheritance
    //this dep class is not mandatory. so in this case this new student class would simply have methods and share all the properties with the parent class
  }
  calcage() {
    //polymorphism
    console.log('age is >>>>>>>polymorhism', 2023 - this.year);
  }
  introduce() {
    console.log(`im ${this._name} and im in ${this.dep}`);
  }
}

//even if we didnot give the constructor and super the child class will take the parent class constructor and method unlike the constructor function where we should link the child with the parent obj prototype

class Student2 extends Personcl1s {}

const studentwithoutconstructor = new Student2('hello jon', 1999);

const studentwithconstructor = new Student1('hello jon', 1999, 'eie');
console.log(studentwithoutconstructor);
console.log(studentwithconstructor);

const martha = new Student1('matha namir', 1999, 'eie');
martha.introduce();
martha.calcage();
console.log(martha);
