// jshint esversion: 9
class Product {
  // we basically overwrite everything we set up there in the constructor and therefore you can actually remove that. This definition here is not required to be able to assign values, in the constructor you can add properties for the first time, so without having defined fields for them before just like that with the this keyword and indeed it makes no sense or it rarely makes sense to define fields here.

  // title = "DEFAULT";
  // imageUrl;
  // description;
  // price;

  //  we need a special method, a method which Javascript automatically calls when we create a new instance of this class and we create a new instance when we call new and then execute this class like a function and this special method which Javascript executes for us is called the constructor method or the constructor function.
  constructor(title, image, desc, price) {
    // we can accept any arguments, any parameters you want just like (parantez ici) that and in the curly braces and that's the interesting thing now, you can assign the values you're getting here for these parameters, to your class field, so to the properties of the object when it is instantiated then and you do this with the good old 'this' keyword. this refers class.
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    // if your subclass, so the class which extends another class, does not have a constructor, the constructor of the parent class is automatically called.
    console.log("called");
    this.hookId = renderHookId;
  }
  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

// you can only herit one class. It means that shopping cart now still creates normal objects if we instantiate it but all these objects don't just have all the logic we defined in here but also all the logic we defined in the base class(component),
class ShoppingCart extends Component {
  items = [];

  //  I expect value to be an array of cart items, so I override the existing array with a new one.
  set cartItems(value) {
    this.items = value;
    // so that when ever we set new cart items, I actually recalculate the total amount and update the HTML code,
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, curItem) => {
      return prevValue + curItem.price;
    }, 0);
    return sum;
  }

  // Now if you add a constructor, maybe below the getters and setters, to your subclass, so to the class which is extending, then this constructor will be called and the parent class constructor will not be called, so also not what I want. What I in the end want here is I want to call this constructor and from there, call the parent constructor, so the constructor of the parent class which is the class we're extending from and we can do this with another special keyword, the super keyword, execute it like a function and this will call the constructor in the parent class and you want to do this in your own constructors if you're a parent class also has a constructor that should be executed, which typically is the case if it has a constructor. Now one important note about super - when you add super to your constructor, make sure you're not relying on any field in that super constructor method, that will become important later and also if you plan on adding properties in your constructor with this something equals something else, you have to do that after you called super and you always have to call super, so the constructor of your parent class, of your base class first before you start using this inside of your subclass constructor.
  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    // this will trigger the setter, pass updated items as a value to it and then therefore update the code
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2");
    // I'll just return cart el here in the render method so that wherever we create that shopping cart, we can append it to the DOM.
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    // just to re-iterate what we learned: "this.product = product" adds a new 'product' property to the eventually created objects.
    this.product = product;
  }

  addToCart() {
    console.log("clicked");
    console.log(this.product);
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    `;
    // We only have one button in there and therefore this is the button we get access to. Now please note, since I execute this inside of the render method of this class, this always applies to this snippet which is created for this concrete instance which is later created on that class. So the fact that we'll create multiple products and therefore have multiple buttons on the screen does not cause a problem here because when this code runs here, this entire code, we're only looking at a single product because we're in a single class which is responsible for creating a single product. So we will run this code on this snippet which only holds one button and therefore we get access to exactly that button for this product.
    const addCartButton = prodEl.querySelector("button");
    // We execute add to cart whenever the button is clicked, we assign the add to cart method of this object, of this class to this button or to this event listener. Now as you learned in that object module, Javascript then binds this to the source of that event, so to that button and not to your your class or the object where this effectively runs on later. The solution or one possible solution is to use bind here and bind this, so that means that we bind this inside of add to cart, so what this refers to instead of this method to the same thing this refers to in this place here and this here in this code snippet refers to the entire object, so to this product item object assuming that we call render on an instance of this object,
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  // what will happen here is that when we create an object based on this class, a product's property will be added automatically and the default value will be that array.
  products = [
    new Product(
      "A Pillow",
      "https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg",
      "A carpet which you might like - or not.",
      89.99
    ),
  ];

  // the products field is magically added as a property during the construction process anyways.
  constructor() {}

  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      // as you learned, render will return this new object. So now we can append product element again because prod el is such a DOM object created by render
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart('app');
    this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(prodListEl);
  }
}

// we kind of use this app class and the static method as a proxy because and that's the advantage and the whole idea of using these static methods, since we always operate on the class and not on instances, we don't work on different objects which we would do if we would not use static and instead create different apps in different places of the app but instead the app I'm using here to init my app, this class is the same I can now call from inside product item. So here in add to cart, we can get rid of that instead just call app add product to cart, this product, referring to the product stored in this product item. So here I am utilizing static methods and the fact that we're not working on objects based on classes but on the class itself to share some data, share the cart instance for example.
class App {
  // bunu niye ekledi anlamadim!!
  static cart;

  // static methods and static properties are always a good idea if you want to share some functionality across different parts of your application or like in this case, if you want to share some data or use this as kind of a communication interface you could say.
  static init() {
    const shop = new Shop();
    shop.render();
    // if you use 'this' in a static method, it always refers to the class itself, doesn't try to refer to an object based on the class, so it adds a static property implicitly and accesses this static property and implicitly therefore but still this makes it clear hat we expect to have that static property, not needed technically but I think it improves readability.
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
