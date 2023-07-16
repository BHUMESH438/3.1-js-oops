'use strict';
//es6 function declaration
const Person = function (name, year) {
  console.log('emptypconstructor function', this);
  this.name = name;
  this.year = year;
};
console.log('>>>', new Person('bhu', 1999));

//when the constructor function is invoked by new keyword => these 4 steps happens created an empty {},this gives ={},link {} with proptotype, new return obj

//es5 class declaration - class are nothing but a syntactic sugar of the contructor function
class Person111 {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}
const jon = new Person111('bhu', 1999);
console.log('jon before adding func', jon);
console.log('person111 construtct func with func added', Person111.prototype);
Person111.prototype.age = function (year) {
  console.log('current age>>>', 2023 - this.year);
};
jon.age();
console.log('jon after adding func', jon);
//whaterver func we add it will directly add in the constructor function and that is accessable by the instance through the prototypes. and the protottypes is added to the constructor function while creating the constructor function and invoking it . then the same goes for the obj instances.

console.log(jon.__proto__);
console.log(
  'checking the insatnce with parent prototype that is having the prototype of parent or not but it is false but in js shous true as it shows the prototype obj in parent prototype not __proto__ in parent which is obviously null',
  jon.__proto__ === Person111.prototype
);
console.log('>>checking the prototype', Person111.prototype.isPrototypeOf(jon));

//adding the prototype to the person111(parent coinstructor function)
Person111.prototype.species = 'homo';

//checking the object created has its own property or has the property from the prototypes

console.log(jon.hasOwnProperty('year'));
console.log(jon.hasOwnProperty('species'));
// console.log(jon.__proto__.__proto__);
// console.log(jon.__proto__);
console.log(Person111.prototype.constructor); //with prototype
const arr = [1, 2];
console.log(arr.__proto__);

//---------------------challange-1 using the consturctor function
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
}
Car.prototype.accelerate = function () {
  console.log(`the ${this.make}  new speed is ${this.speed + 10}`);
};
Car.prototype.break = function () {
  console.log(`the ${this.make} after break new speed is ${this.speed - 10}`);
};
const BMW = new Car('BMW', 120);
const Mercides = new Car('Mercides', 95);

console.log(BMW);
BMW.accelerate();
BMW.break();
console.log(Mercides);
Mercides.accelerate();
Mercides.break();

//------------------es6 class ----------------
//classes are special type of functions
//class declaration-
class Personcl {}
//class expresion
const Personcl1 = class {};

class Personcls {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  //methods will be added to the prototype property of the class when the prototype obj is created when the new obj is intantiated form the class
  calcage() {
    //instance method-------------------
    console.log('age is >>>>>>>', 2023 - this.year);
  }
  get getcalcage() {
    //getters in the class it will be like a property and not a method in the prototype property of the personcl class
    return 2023 - this.year;
  }

  //giving setter property in js that for that the value  already exist---------------------------
  /**
   * @param {string | string[]} name
   */
  set name(name) {
    console.log('set name>>>>>>>>', name);
    if (name.includes(' ')) this._name = name;
    else alert(`${name} is not full name!`);
  }

  //after this if we try to get the jesscia.name it will be undefined so we set the get name

  get name() {
    return this._name;
  }
  //-----------------------------------------static method
  static hey() {
    console.log('hey there>>>>>>>>>>😀');
    console.log('static method used in the person class>>>', this);
  }
}

const jessica = new Personcls('jessi ka ', 1999);
jessica.calcage();
console.log('>>>>>>jessica age', jessica.getcalcage);
console.log(jessica); //prototype obj with proto which is inside the proptotype [[]] obj
console.log(Personcls.prototype);
console.log(jessica.__proto__); //form parent
console.log(jessica.__proto__ === Personcls.prototype);

//-------------getters and setters-------------------------
//simple obj literal
const owner = {
  name: 'sam',
  movemetns: [100, 200, 300, 400, 500],
  get latest() {
    return this.movemetns.slice(-1).pop();
  },
  set latest(a) {
    this.movemetns.push(a);
  },
};
console.log(owner);
//------------getter - can be useful when we want to read some property and do some calculations before
console.log(owner.latest); //here at our getter function we didnot invoked the latest function as we used the get in the latest method.

//its not mandatory to specify a setter when we have a getter for a property

owner.latest = 503;
console.log(owner.movemetns);

//------------------------------------------------------------static methods
Person.hey = function () {
  console.log('hey there>>>>>>>>>>😀');
  console.log('static method used in the person method>>>', this);
};
Person.hey();
Personcls.hey();
// console.log(jessica.hey);
//hey method is not inherited throught out the class instance  as this  method we added externally ande not included in the prototypal chain of the Personcls class

//-----------object.create-------------------------------------------------
const steveProto = {
  age() {
    console.log(2024 - this.year);
  },
  init(name, year) {
    this.name = name;
    this.year = year;
  },
};

//here we set explicityly(Object.create(steveProto)) that the steve.proto(child) should be the  prototype of the steveProto(parent)
//manual implimentation of obj properties
const steve = Object.create(steveProto);
console.log(steve);
steve.age = 1999;
steve.name = 'bhumesh';
console.log(steve);
console.log(steveProto);
console.log(steve.__proto__);
console.log(steve.__proto__ === steveProto);

//fun implimentation of obj properties
const sara = Object.create(steveProto);
sara.init('sara', 1998);
sara.age();

class Car1 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(
      `the ${this.make} after accelerate  new speed is ${this.speed} km/h`
    );
  }
  break() {
    this.speed -= 5;
    console.log(`the ${this.make} after break new speed is ${this.speed}km/h`);
  }

  set speedUS(speeed) {
    if (speeed) {
      console.log(`set speed ${speeed} m/h to ${speeed * 1.6} km/h`);
      return (this.speed = speeed * 1.6);
    } else alert(`${speed} give the speed!`);
  }
  get speedUS() {
    console.log(`get speed ${this.speed}km/h in ${this.speed / 1.6} mi/h`);
    return this.speed / 1.6;
  }
}

const ford = new Car1('ford', 120);
console.log('return value getters>>>', ford.speedUS);
ford.accelerate();
ford.break();
ford.speedUS = 50; //set speed
console.log('return value getters>>>', ford.speedUS);
