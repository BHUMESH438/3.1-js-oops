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

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} car speed increased by 10 => ${this.speed}Km/hr`);
};
Car.prototype.break = function () {
  this.speed -= 5;
  console.log(`${this.make} car speed decreased by 5 => ${this.speed}Km/hr`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
  console.log(
    `${this.make}  is going at speed of ${this.speed} and with the charge of ${this.charge} `
  );
};
//linking parent to child manually
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargebattery = function (chargeto) {
  this.charge = chargeto;
  console.log(`${this.make} EV  is cahrging at ${this.charge} `);
};

//polymorphism - overridding the existing method and  in the prototypal chain it will be at the top and js will take the method name at the top of the prototypal chain . because at the bottom the previous or the first created or the older version if that method exist. child=>parent=>inbuilt obj and if you see in the dom it is in the order if top to bottom approach
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} EV speed increased by 20 => ${this.speed}Km/hr  and charge decreased 1 % ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);

console.log(tesla);

tesla.break(); //parent(car)
tesla.accelerate(); //child(ev)
tesla.chargebattery(90); //child(ev)
tesla.accelerate();
tesla.break();
