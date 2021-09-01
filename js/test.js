function Person(name) {
  this.name = name;
  this.greeting = function () {
    return "Hello world";
  };
}

let person1 = new Person("Roman");
console.log(person1.toString());

let foo = { bar: 1 };
console.log(foo.constructor);
