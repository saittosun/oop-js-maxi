//jshint esversion: 9
class Person {
  name = "max";
}

const p = new Person();
console.log(p);
console.log(typeof p);

// There is a special operator, instanceof and you can use it to check if an object is created based on a certain class or a certain blueprint. You use it by using your concrete object, in this case p which is this constant it holds the object,

//  the instanceof operator here helps you find out if an object you have is based on that type, based on that class or not.

console.log(p instanceof Person); // return true if p was created based on person or if the value stored in p was created based on person and it will return false otherwise

const btn = document.querySelector("button");
console.log(btn); // <button>Order Now!</button>
console.dir(btn); // button (object)

console.log(btn instanceof HTMLButtonElement); // true

console.log(btn instanceof HTMLElement); // true

console.log(btn instanceof Person); // false

// object descriptions ////////
const user = {
  name: "max",
  greet(a) {
    console.log(this.name);
  },
};
console.log(user);
user.greet();

const userDescriptor = Object.getOwnPropertyDescriptors(user);
console.log(userDescriptor);
// it's enumerable which means it appears in a for/in loop

// Now thus far I haven't talked about that because often, these defaults are OK but sometimes in advanced programs, you might want to lock down a property, you want to make sure that it can't be written to for example. Well to do that, you can use object and then define property, pass in the object user, then your property, name for example, so the property you want to change or you want to add, you can also add a new property with that, here I want to change the property with the name name and you have to pass that in as a string of course because like that it would be looking for a variable named name and then use the value stored in that value as a property key it's looking for, so using string here and then the third argument is an object which describes the descriptors or which sets the configuration for your object, so basically an object which can have these four values, every value which you don't set gets false now.
const defineProperty = Object.defineProperty(user, "name", {
  configurable: true,
  enumerable: true,
  value: user.name,
  writable: false,
});

console.log(defineProperty);

user.name = "esat";
console.log(user.name); // user still has Max in there, it didn't throw an error but it didn't accept the change. Now this is a way of locking down this property. configurable false yaparsak silmeyi de engelleyebiliriz.
