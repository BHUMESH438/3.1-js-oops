'use strict';
const Person = function (name, year) {
  this.name = name;
  this.year = year;
};
Person.prototype.calcage = function () {
  console.log(2023 - this.year);
};

const Student = function (name, year, dep) {
  // Person(name, year);- we are passing the persin function constructor as a regular function call and we are not using the new operator to call 'this' person constructor obj. therfore this person function call is simply a regular function call. In a regular function call the this keyword is set to undefined. Because of that we will get an error that the first name cannot set undefined
  Person.call(this, name, year);
  this.dep = dep;
};
//linking obj prototypes from child to parent so that the child can access both the student and person property as the mike instance from the student constuctor is also a person so we must inherit the prperty/method of the person to the child i.e the stident by linking the person obj through stident proto by OBject.create so we manually link the person obj prototype methods to student prototype obj.
Student.prototype = Object.create(Person.prototype);
//adding introduce method to the student child
Student.prototype.introduce = function () {
  console.log(`hi im ${this.name} and in ${this.dep} department`);
};
const mike = new Student('bhu', 1999, 'eie');
mike.introduce();
mike.calcage();
console.log(mike); //mike obj
console.log(mike.__proto__); //student obj and mike proto
console.log(mike.__proto__.__proto__); //person obj and student proto
console.log(mike.__proto__.__proto__.__proto__); //internal obj and person proto
console.log(mike.__proto__.__proto__.__proto__.__proto__); //init internal obj in null and internal proto

console.dir(Student.prototype.constructor);
//js thinks the consturctor of student is still person  as we set the student prototype as the person prototype obj so it obviously the student prototype constructor function return person function
console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //ture

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

//here the mike is the instance of the both the parent and child and if we want to mike to be the only instance of childi.e student we should not create/link the student prototype obj to the parent i.e person. so that the mike.calcage() will not be accessable
//Student.prototype = Object.create(Person.prototype);
console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //ture
console.log(mike instanceof Object); //ture
