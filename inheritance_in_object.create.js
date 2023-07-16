'use strict';
//onj literal with methods and obj
const personProto = {
  calcAge() {
    //methods
    console.log(2037 - this.year);
  },

  init(name, year) {
    //method
    this.name = name;
    this.year = year;
    console.log('name and year', this.name, this.year);
  },
};

const steve = Object.create(personProto); //child of person
console.log(steve);
//manual way of giving obj
steve.name = 'bhu';
steve.year = 1999;
//programatic way of giving obj
steve.init('bhu', 1999);
steve.calcAge();
console.log(steve);

const Studentproto = Object.create(personProto); //child of person , will create empty obj
//adding method to the child(polymorphism)
Studentproto.init = function (name, year, course) {
  personProto.init.call(this, name, year); //inheriting the parent and use call for the methods of the parent obj
  this.course = course;
};
Studentproto.init('sd', 2015, 'eie');
Studentproto.intrduce = function () {
  console.log(`my name is ${this.name} and im in ${this.course}`);
};
Studentproto.intrduce();
Studentproto.calcAge();

////---------------------------------------
